import { motion } from "framer-motion";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with slow zoom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${primalHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "slow-zoom 30s ease-in-out alternate infinite",
        }}
      />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, hsl(25 30% 6% / 0.6) 70%, hsl(25 30% 6% / 0.95) 100%),
            linear-gradient(to bottom, hsl(25 30% 6% / 0.3) 0%, transparent 30%, transparent 70%, hsl(25 30% 6% / 1) 100%)
          `,
        }}
      />

      {/* Bottom fire glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
        style={{
          background: "linear-gradient(to top, hsl(24 80% 50% / 0.08), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          className="font-heading text-xs md:text-sm tracking-[0.6em] uppercase mb-6"
          style={{ color: "hsl(var(--bone-muted))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          Ancient Voices
        </motion.p>

        <motion.h1
          className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.1em] leading-none mb-4"
          style={{ color: "hsl(var(--bone))", animation: "fire-flicker 4s ease-in-out infinite" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        >
          TEAM<br className="md:hidden" /> ALPHA
        </motion.h1>

        <motion.p
          className="font-heading text-xs md:text-sm tracking-[0.6em] uppercase mt-6"
          style={{ color: "hsl(var(--bone-muted))" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Of Fire & The New Age
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, hsl(var(--bone) / 0.4), transparent)" }}
        />
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ color: "hsl(var(--bone-muted))" }}>
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
