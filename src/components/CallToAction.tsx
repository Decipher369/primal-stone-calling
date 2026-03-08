import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP: parallax bg + dramatic zoom on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bg = section.querySelector("[data-cta-bg]") as HTMLElement;
    if (!bg) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { scale: 1.1, yPercent: -10 },
        {
          scale: 1,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="call" className="relative py-32 md:py-48 px-4 overflow-hidden">
      {/* Background image with parallax */}
      <div
        data-cta-bg
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${primalHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, hsl(25 30% 6% / 0.7) 0%, hsl(25 30% 6% / 0.9) 70%),
            linear-gradient(to bottom, hsl(25 30% 6% / 1) 0%, transparent 15%, transparent 85%, hsl(25 30% 6% / 1) 100%)
          `,
        }}
      />

      <div className="container mx-auto max-w-3xl relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          }}
        >
          <motion.p
            className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6"
            variants={{
              hidden: { opacity: 0, y: 30, letterSpacing: "1em" },
              visible: { opacity: 1, y: 0, letterSpacing: "0.5em", transition: { duration: 1.2 } },
            }}
          >
            Answer the Call
          </motion.p>
          <motion.h2
            className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight mb-8"
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] } },
            }}
          >
            Carve Your Name<br />Into History
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-body leading-relaxed text-bone-muted max-w-lg mx-auto mb-14"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1 } },
            }}
          >
            The stones have spoken. The fire awaits your mark. Join the tribe — let your voice echo through the ages.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 200 } },
            }}
          >
            <motion.a
              href="#"
              className="btn-brand-filled text-base md:text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 60px hsla(24, 80%, 50%, 0.5), 0 0 120px hsla(24, 80%, 50%, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              Join the Tribe
            </motion.a>
          </motion.div>

          <motion.p
            className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted mt-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
            }}
          >
            Limited to 100 Warriors
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
