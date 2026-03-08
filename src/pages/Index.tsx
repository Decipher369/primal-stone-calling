import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import TrialsTimeline from "@/components/TrialsTimeline";
import CallToAction from "@/components/CallToAction";
import TribalProcession from "@/components/TribalProcession";
import RegistrationModal from "@/components/RegistrationModal";
import tribalEmblem from "@/assets/tribal-emblem.png";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      <HeroSection />

      {/* Nomad's tale intro */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-8">A Warrior's Tale</p>
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

      {/* Footer */}
      <footer className="py-16 px-4 text-center" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <img src={tribalEmblem} alt="Team Alpha" className="h-10 w-auto mx-auto mb-6 opacity-60" />
        <p className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted">
          Team Alpha 2026 · The Tribe Rises
        </p>
      </footer>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
