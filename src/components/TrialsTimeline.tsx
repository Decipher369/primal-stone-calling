import { useEffect, useRef } from "react";
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

const TrialsTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".trials-header",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".trials-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Each trial card with staggered entrance
      document.querySelectorAll(".trial-card").forEach((card, i) => {
        const isEven = i % 2 === 0;
        const textEl = card.querySelector(".trial-text");
        const imageEl = card.querySelector(".trial-image");

        // Text slides in from alternating sides
        gsap.fromTo(
          textEl,
          { opacity: 0, x: isEven ? -80 : 80 },
          {
            opacity: 1, x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Image scales up with slight rotation
        gsap.fromTo(
          imageEl,
          { opacity: 0, scale: 0.7, rotation: isEven ? -5 : 5 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // Trial number counter-like pop
        const numEl = card.querySelector(".trial-number");
        gsap.fromTo(
          numEl,
          { opacity: 0, scale: 2, y: -20 },
          {
            opacity: 0.3, scale: 1, y: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trials" className="relative py-28 md:py-40 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="trials-header text-center mb-24">
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">The Journey</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved">
            The Trials
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {trials.map((trial, index) => (
            <div
              key={trial.title}
              className={`trial-card grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                index % 2 !== 0 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Text */}
              <div className={`trial-text ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="trial-number text-display text-5xl md:text-7xl font-bold text-fire opacity-0">{trial.number}</span>
                  <div>
                    <p className="font-heading text-xs tracking-[0.4em] uppercase text-fire mb-1">{trial.subtitle}</p>
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-carved">{trial.title}</h3>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-body leading-relaxed text-bone-muted mt-6">
                  {trial.description}
                </p>
              </div>

              {/* Image */}
              <div className={`trial-image flex ${index % 2 !== 0 ? "md:order-1 md:justify-start" : "md:justify-end"} justify-center`}>
                <div className="petroglyph-card p-6 w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                  <img
                    src={trial.image}
                    alt={trial.alt}
                    className="w-full h-full object-contain opacity-65 mix-blend-screen"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrialsTimeline;
