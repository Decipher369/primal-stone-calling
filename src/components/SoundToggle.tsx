import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playStoneClick, playWhoosh, startFireAmbient, stopFireAmbient } from "@/lib/sounds";

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const lastSection = useRef<string | null>(null);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    if (next) {
      playStoneClick();
      startFireAmbient();
    } else {
      stopFireAmbient();
    }
  }, [enabled]);

  // Section transition whoosh on scroll
  useEffect(() => {
    if (!enabled) return;

    const sections = () => document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id || entry.target.className;
            if (id !== lastSection.current) {
              lastSection.current = id;
              playWhoosh();
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    const els = sections();
    els.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  // Global click sound on buttons/links
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        playStoneClick();
      }
    };
    window.addEventListener("click", handler, true);
    return () => window.removeEventListener("click", handler, true);
  }, [enabled]);

  // Cleanup on unmount
  useEffect(() => () => stopFireAmbient(), []);

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full border border-border"
      style={{
        background: enabled
          ? "linear-gradient(135deg, hsl(var(--cave-mid)), hsl(var(--cave-surface)))"
          : "hsl(var(--cave-mid))",
        boxShadow: enabled
          ? "0 0 20px hsl(var(--fire) / 0.3), var(--shadow-carved)"
          : "var(--shadow-carved)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      title={enabled ? "Mute tribal sounds" : "Enable tribal sounds"}
    >
      {/* Speaker icon with fire flair */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--bone) / 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {enabled ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="hsl(var(--fire))" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="hsl(var(--fire) / 0.5)" />
          </>
        ) : (
          <line x1="23" y1="9" x2="17" y2="15" stroke="hsl(var(--bone) / 0.4)" />
        )}
      </svg>

      {/* Fire glow pulse when active */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: "0 0 15px hsl(var(--fire) / 0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SoundToggle;
