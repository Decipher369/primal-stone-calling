import { motion } from "framer-motion";
import MissionSection from "@/components/MissionSection";
import TrialsTimeline from "@/components/TrialsTimeline";
import CallToAction from "@/components/CallToAction";
import stoneWallBg from "@/assets/stone-wall-bg.jpg";

const Index = () => {
  return (
    <div className="relative min-h-screen">
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
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(to bottom, hsl(200 10% 8% / 0.85), hsl(200 10% 8% / 0.7), hsl(200 10% 8% / 0.9))" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4 text-center relative overflow-hidden">
          {/* Floating embers in hero */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 4,
                  backgroundColor: `hsl(${20 + Math.random() * 20}, 90%, ${50 + Math.random() * 30}%)`,
                  left: `${5 + Math.random() * 90}%`,
                  bottom: 0,
                  boxShadow: `0 0 6px hsl(24, 85%, 50%)`,
                }}
                animate={{ y: [-20, -300 - Math.random() * 400], opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 4 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 6,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.p
            className="text-fire font-heading text-sm md:text-base tracking-[0.5em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            The Tribe Calls
          </motion.p>

          <motion.h1
            className="text-display text-fire text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider mb-4"
            style={{ animation: "fire-flicker 3s ease-in-out infinite" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          >
            TEAM ALPHA
          </motion.h1>

          <motion.p
            className="text-carved text-2xl md:text-3xl tracking-[0.4em] uppercase font-heading mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            2026
          </motion.p>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-lg font-body leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            In the age before steel, before thrones — there was only the voice and the fire. 
            Rise with the tribe or be forgotten.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, hsl(var(--fire) / 0.6), transparent)" }} />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-heading mt-2">Scroll</p>
          </motion.div>
        </section>

        <div className="section-divider w-64 mx-auto" />
        <MissionSection />
        <div className="section-divider w-64 mx-auto" />
        <TrialsTimeline />
        <div className="section-divider w-64 mx-auto" />
        <CallToAction />

        <footer className="py-10 text-center border-t border-border/30">
          <p className="text-muted-foreground text-sm font-heading tracking-wider uppercase">
            Team Alpha 2026 · The Tribe Rises
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
