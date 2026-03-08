import { useState, useRef, useCallback } from "react";
import TorchCursor from "@/components/TorchCursor";
import SoundToggle from "@/components/SoundToggle";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import TrialsTimeline from "@/components/TrialsTimeline";
import CallToAction from "@/components/CallToAction";
import TribalProcession from "@/components/TribalProcession";
import RegistrationModal from "@/components/RegistrationModal";
import { useEasterEggs, EasterEggOverlays } from "@/components/EasterEggs";
import tribalEmblem from "@/assets/tribal-emblem.png";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const easterEggs = useEasterEggs();

  // Triple-click on warrior's tale triggers prophecy
  const taleClickCount = useRef(0);
  const taleClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTaleClick = useCallback(() => {
    taleClickCount.current++;
    if (taleClickTimer.current) clearTimeout(taleClickTimer.current);
    taleClickTimer.current = setTimeout(() => { taleClickCount.current = 0; }, 500);
    if (taleClickCount.current >= 3) {
      taleClickCount.current = 0;
      easterEggs.setProphecy(true);
    }
  }, [easterEggs]);

  // Long-press emblem in footer for credits
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startHold = useCallback(() => {
    holdTimer.current = setTimeout(() => {
      easterEggs.setAncientCredits(true);
    }, 3000);
  }, [easterEggs]);
  const endHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <TorchCursor />
      <SoundToggle />
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      <HeroSection />

      {/* Nomad's tale intro — triple-click for prophecy easter egg */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p
              className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-8 cursor-default select-none"
              onClick={handleTaleClick}
            >
              A Warrior's Tale
            </p>
            <p className="text-xl md:text-2xl font-body leading-relaxed" style={{ color: "hsl(var(--bone))" }}>
              Before thrones, before kingdoms — there was the tribe. Bound not by walls but by voice, by fire, by the will to lead. In the primal age, the strongest voice commanded the hunt, shaped the future, forged the world.
            </p>
            <div className="section-divider w-32 mx-auto mt-12" />
          </motion.div>
        </div>
      </section>

      <MissionSection />

      <TribalProcession />

      <div className="section-divider-thick w-full max-w-5xl mx-auto" />

      <TrialsTimeline />

      <CallToAction onJoinClick={() => setIsModalOpen(true)} />

      <TribalProcession />

      {/* Footer — hold emblem 3s for secret credits */}
      <footer className="py-16 px-4 text-center" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <img
          src={tribalEmblem}
          alt="Team Alpha"
          className="h-10 w-auto mx-auto mb-6 opacity-60 cursor-pointer select-none"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
        />
        <p className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted">
          Team Alpha 2026 · The Tribe Rises
        </p>
      </footer>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Easter egg overlays */}
      <EasterEggOverlays {...easterEggs} />
    </div>
  );
};

export default Index;
