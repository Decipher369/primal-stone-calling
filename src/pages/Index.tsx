import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import TrialsTimeline from "@/components/TrialsTimeline";
import CallToAction from "@/components/CallToAction";
import FireEmbers from "@/components/FireEmbers";
import tribalEmblem from "@/assets/tribal-emblem.png";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Warrior's tale section
      gsap.fromTo(
        ".warrior-tale",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".warrior-tale",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Divider line grows
      gsap.fromTo(
        ".main-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".main-divider",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Footer reveal
      gsap.fromTo(
        ".site-footer",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen bg-background">
      <FireEmbers />
      <Navbar />

      <HeroSection />

      {/* Nomad's tale intro */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="warrior-tale">
            <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-8">A Warrior's Tale</p>
            <p className="text-xl md:text-2xl font-body leading-relaxed" style={{ color: "hsl(var(--bone))" }}>
              Before thrones, before kingdoms — there was the tribe. Bound not by walls but by voice, by fire, by the will to lead. In the primal age, the strongest voice commanded the hunt, shaped the future, forged the world.
            </p>
            <div className="section-divider w-32 mx-auto mt-12" />
          </div>
        </div>
      </section>

      <MissionSection />

      <div className="main-divider section-divider-thick w-full max-w-5xl mx-auto origin-left" />

      <TrialsTimeline />

      <CallToAction />

      {/* Footer */}
      <footer className="site-footer py-16 px-4 text-center" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <img src={tribalEmblem} alt="Team Alpha" className="h-10 w-auto mx-auto mb-6 opacity-60" />
        <p className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted">
          Team Alpha 2026 · The Tribe Rises
        </p>
      </footer>
    </div>
  );
};

export default Index;
