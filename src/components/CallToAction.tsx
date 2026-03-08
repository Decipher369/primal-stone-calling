import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax BG
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content reveal
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-content",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Button pulse animation after reveal
      gsap.fromTo(
        ".cta-button",
        { boxShadow: "0 0 0 0 hsl(24 80% 50% / 0.4)" },
        {
          boxShadow: "0 0 30px 10px hsl(24 80% 50% / 0)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: ".cta-button",
            start: "top 90%",
            toggleActions: "play pause resume pause",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="call" className="relative py-32 md:py-48 px-4 overflow-hidden">
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${primalHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          height: "120%",
          top: "-10%",
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
        <div className="cta-content">
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">Answer the Call</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight mb-8">
            Carve Your Name<br />Into History
          </h2>
          <p className="text-lg md:text-xl font-body leading-relaxed text-bone-muted max-w-lg mx-auto mb-14">
            The stones have spoken. The fire awaits your mark. Join the tribe — let your voice echo through the ages.
          </p>

          <a
            href="#"
            className="cta-button btn-brand-filled text-base md:text-lg inline-block"
          >
            Join the Tribe
          </a>

          <p className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted mt-10">
            Limited to 100 Warriors
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
