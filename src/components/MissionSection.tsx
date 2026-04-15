import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import petroglyphGathering from "@/assets/petroglyph-gathering.png";
import darkCaveBg from "@/assets/dark-cave-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // GSAP: scrub parallax on bg + heading text reveal
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const bg = section.querySelector("[data-mission-bg]") as HTMLElement;

    const ctx = gsap.context(() => {
      // Parallax background
      if (bg) {
        gsap.to(bg, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Heading: split lines and animate
      const lines = heading.querySelectorAll("span");
      gsap.from(lines, {
        y: 100,
        opacity: 0,
        rotationX: -45,
        transformOrigin: "50% 100%",
        stagger: 0.2,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="relative py-28 md:py-40 px-4 overflow-hidden">
      {/* Subtle background with parallax */}
      <div
        data-mission-bg
        className="absolute inset-0 opacity-20 will-change-transform"
        style={{
          backgroundImage: `url(${darkCaveBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "hsl(var(--cave-deep))", opacity: 0.85 }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <motion.p
            className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            The Mission
          </motion.p>
          <h2
            ref={headingRef}
            className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight overflow-hidden"
          >
            <span className="block">Forge the</span>
            <span className="block">Unbreakable</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text — stagger reveal with Framer Motion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
            }}
          >
            <motion.p
              className="text-xl md:text-2xl font-body leading-relaxed mb-8"
              style={{ color: "hsl(var(--bone))" }}
              variants={{
                hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1 } },
              }}
            >
              Team Alpha is the platinum award-winning, adventure-based team building and professional development programme by the Rotaract Club of SLIIT — forging leaders through fire, water, and stone since 2016.
            </motion.p>
            <motion.p
              className="text-lg font-body leading-relaxed text-bone-muted mb-10"
              variants={{
                hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1 } },
              }}
            >
              In collaboration with the Sri Lanka Army, warriors are pushed beyond limits — waterfall abseiling, river crossings, jungle hikes, and campfire rituals. No textbooks. No lectures. Only the wild.
            </motion.p>
            <motion.div
              className="section-divider-thick w-24"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.2, ease: "easeOut" } },
              }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Image — scale + rotate entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            <motion.div
              className="petroglyph-card p-8 max-w-sm"
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px hsla(24, 80%, 50%, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={petroglyphGathering}
                alt="The Gathering — primitive cave art depicting the assembly"
                className="w-full opacity-70 mix-blend-screen"
              />
              <p className="text-center font-heading text-xs tracking-[0.4em] uppercase mt-6 text-bone-muted">
                Where Leaders Are Forged
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
