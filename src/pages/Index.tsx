import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroSequence from "@/components/IntroSequence";
import MissionSection from "@/components/MissionSection";
import TrialsTimeline from "@/components/TrialsTimeline";
import CallToAction from "@/components/CallToAction";
import stoneWallBg from "@/assets/stone-wall-bg.jpg";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative min-h-screen"
      >
        {/* Stone wall background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${stoneWallBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark overlay for readability */}
        <div
          className="fixed inset-0 z-0"
          style={{ background: "linear-gradient(to bottom, hsl(200 10% 8% / 0.85), hsl(200 10% 8% / 0.7), hsl(200 10% 8% / 0.9))" }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Hero repeat */}
          <section className="flex flex-col items-center justify-center min-h-[60vh] pt-20 pb-10 px-4 text-center">
            <motion.h1
              className="text-display text-fire text-4xl sm:text-5xl md:text-7xl font-black tracking-wider mb-4"
              style={{ animation: "fire-flicker 3s ease-in-out infinite" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              TEAM ALPHA
            </motion.h1>
            <motion.p
              className="text-carved text-xl md:text-2xl tracking-[0.3em] uppercase font-heading mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              2026
            </motion.p>
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-md font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Where voices become weapons and leaders are forged in fire.
            </motion.p>
          </section>

          <div className="section-divider w-64 mx-auto" />

          <MissionSection />

          <div className="section-divider w-64 mx-auto" />

          <TrialsTimeline />

          <div className="section-divider w-64 mx-auto" />

          <CallToAction />

          {/* Footer */}
          <footer className="py-10 text-center border-t border-border/30">
            <p className="text-muted-foreground text-sm font-heading tracking-wider uppercase">
              Team Alpha 2026 · The Tribe Rises
            </p>
          </footer>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
