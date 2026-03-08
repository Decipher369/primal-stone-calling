import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import petroglyphGathering from "@/assets/petroglyph-gathering.png";
import darkCaveBg from "@/assets/dark-cave-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Header reveal
      gsap.fromTo(
        ".mission-header",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Left column text — slide from left
      gsap.fromTo(
        ".mission-text",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-text",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right column image — slide from right with rotation
      gsap.fromTo(
        ".mission-image",
        { opacity: 0, x: 60, rotation: 3 },
        {
          opacity: 1, x: 0, rotation: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-image",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="relative py-28 md:py-40 px-4 overflow-hidden">
      {/* Subtle background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20 will-change-transform"
        style={{
          backgroundImage: `url(${darkCaveBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120%",
          top: "-10%",
        }}
      />
      <div className="absolute inset-0" style={{ background: "hsl(var(--cave-deep))", opacity: 0.85 }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mission-header text-center mb-20">
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">The Mission</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight">
            The Gathering<br />of the 100
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="mission-text">
            <p className="text-xl md:text-2xl font-body leading-relaxed mb-8" style={{ color: "hsl(var(--bone))" }}>
              From every corner of the land, 100 warriors answer the call. Not chosen by blood, but by fire — the fire to speak, to lead, to conquer.
            </p>
            <p className="text-lg font-body leading-relaxed text-bone-muted mb-10">
              This is not a competition. This is a proving ground. Each delegate will be forged through trials of voice and will, emerging as leaders of a new age.
            </p>
            <div className="section-divider-thick w-24" />
          </div>

          <div className="mission-image flex justify-center">
            <div className="petroglyph-card p-8 max-w-sm">
              <img
                src={petroglyphGathering}
                alt="The Gathering — primitive cave art depicting the assembly"
                className="w-full opacity-70 mix-blend-screen"
              />
              <p className="text-center font-heading text-xs tracking-[0.4em] uppercase mt-6 text-bone-muted">
                The Assembly Awaits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
