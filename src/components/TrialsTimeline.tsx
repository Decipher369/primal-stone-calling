import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import petroglyphSpeaking from "@/assets/petroglyph-speaking.png";
import petroglyphVirtual from "@/assets/petroglyph-virtual.png";
import petroglyphBattle from "@/assets/petroglyph-battle.png";

gsap.registerPlugin(ScrollTrigger);

const trials = [
  {
    number: "I",
    title: "The Voice Trial",
    subtitle: "Speaking Workshop",
    description: "Master the ancient art of commanding a room. In these sacred grounds, your voice becomes your weapon — sharp, resonant, unstoppable.",
    image: petroglyphSpeaking,
    alt: "Petroglyph of an orator addressing the tribe",
  },
  {
    number: "II",
    title: "The Spirit Walk",
    subtitle: "Virtual Rounds",
    description: "Across unseen pathways, warriors clash in virtual arenas. No walls can contain the power of a mind sharpened for battle.",
    image: petroglyphVirtual,
    alt: "Petroglyph of mystic communication circle",
  },
  {
    number: "III",
    title: "The Grand Siege",
    subtitle: "Military-Themed Finale",
    description: "The final trial. A military gauntlet where only the strongest voices survive. This is where legends are carved into stone forever.",
    image: petroglyphBattle,
    alt: "Petroglyph of warriors in battle formation",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -80 : 80,
    rotateY: i % 2 === 0 ? 15 : -15,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, delay: 0.3, ease: "easeOut" },
  },
};

const numberVariants = {
  hidden: { opacity: 0, scale: 3, filter: "blur(20px)" },
  visible: {
    opacity: 0.3,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const TrialsTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // GSAP: animated vertical line that grows as you scroll
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const line = el.querySelector("[data-timeline-line]") as HTMLElement;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="trials" className="relative py-28 md:py-40 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-24">
          <motion.p
            className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5 }}
          >
            The Journey
          </motion.p>
          <motion.h2
            className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Trials
          </motion.h2>
        </div>

        <div ref={timelineRef} className="relative space-y-24 md:space-y-32">
          {/* Animated timeline line */}
          <div
            data-timeline-line
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--fire) / 0.4), transparent)",
              transformOrigin: "top",
            }}
          />

          {trials.map((trial, index) => (
            <motion.div
              key={trial.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                index % 2 !== 0 ? "md:direction-rtl" : ""
              }`}
              style={{ perspective: "1000px" }}
            >
              {/* Text */}
              <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                <div className="flex items-baseline gap-4 mb-4">
                  <motion.span
                    className="text-display text-5xl md:text-7xl font-bold text-fire"
                    variants={numberVariants}
                  >
                    {trial.number}
                  </motion.span>
                  <div>
                    <motion.p
                      className="font-heading text-xs tracking-[0.4em] uppercase text-fire mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {trial.subtitle}
                    </motion.p>
                    <motion.h3
                      className="font-heading text-2xl md:text-3xl font-semibold text-carved"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {trial.title}
                    </motion.h3>
                  </div>
                </div>
                <motion.p
                  className="text-lg md:text-xl font-body leading-relaxed text-bone-muted mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  {trial.description}
                </motion.p>
              </div>

              {/* Image */}
              <motion.div
                className={`flex ${index % 2 !== 0 ? "md:order-1 md:justify-start" : "md:justify-end"} justify-center`}
                variants={imageVariants}
              >
                <motion.div
                  className="petroglyph-card p-6 w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
                  whileHover={{
                    scale: 1.08,
                    rotate: index % 2 === 0 ? 3 : -3,
                    boxShadow: "0 0 50px hsla(24, 80%, 50%, 0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <img
                    src={trial.image}
                    alt={trial.alt}
                    className="w-full h-full object-contain opacity-65 mix-blend-screen"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrialsTimeline;
