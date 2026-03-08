import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playStampede, playFireBurst, playProphecy, playGhostWind, playWarDrums, playGong } from "@/lib/sounds";

/**
 * Easter Eggs system for the tribal site.
 * 
 * 1. KONAMI CODE → ↑↑↓↓←→←→BA → Full-screen mammoth stampede + screen shake
 * 2. Triple-click the page title area → Ancient prophecy overlay
 * 3. Type "fire" anywhere → Screen edges catch fire briefly
 * 4. Idle for 30s → A cave painting ghost appears and fades
 * 5. Click 7 times rapidly → Tribal war drums visualization
 * 6. Secret footer: hold emblem for 3s → Credits cave painting
 */

// ─── 1. Konami Code detector ───
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

// ─── 2. Secret word detector ───
const SECRET_WORD = "fire";

export function useEasterEggs() {
  const [stampede, setStampede] = useState(false);
  const [fireBurst, setFireBurst] = useState(false);
  const [prophecy, setProphecy] = useState(false);
  const [ghostPainting, setGhostPainting] = useState(false);
  const [warDrums, setWarDrums] = useState(false);
  const [ancientCredits, setAncientCredits] = useState(false);

  const konamiIndex = useRef(0);
  const typedChars = useRef("");
  const clickTimes = useRef<number[]>([]);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset idle timer
  const resetIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setGhostPainting(true);
      playGhostWind();
      setTimeout(() => setGhostPainting(false), 6000);
    }, 30000);
  }, []);

  useEffect(() => {
    // Konami + secret word listener
    const handleKey = (e: KeyboardEvent) => {
      resetIdle();

      // Konami
      if (e.key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          setStampede(true);
          playStampede();
          setTimeout(() => setStampede(false), 5000);
        }
      } else {
        konamiIndex.current = e.key === KONAMI[0] ? 1 : 0;
      }

      // Secret word "fire"
      if (e.key.length === 1) {
        typedChars.current += e.key.toLowerCase();
        if (typedChars.current.length > 20) {
          typedChars.current = typedChars.current.slice(-20);
        }
        if (typedChars.current.endsWith(SECRET_WORD)) {
          typedChars.current = "";
          setFireBurst(true);
          playFireBurst();
          setTimeout(() => setFireBurst(false), 3000);
        }
      }
    };

    // Rapid click detector (7 clicks in 2 seconds)
    const handleClick = () => {
      resetIdle();
      const now = Date.now();
      clickTimes.current.push(now);
      clickTimes.current = clickTimes.current.filter(t => now - t < 2000);
      if (clickTimes.current.length >= 7) {
        clickTimes.current = [];
        setWarDrums(true);
        setTimeout(() => setWarDrums(false), 4000);
      }
    };

    const handleMove = () => resetIdle();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMove);
    resetIdle();

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdle]);

  return {
    stampede,
    fireBurst,
    prophecy, setProphecy,
    ghostPainting,
    warDrums,
    ancientCredits, setAncientCredits,
  };
}

// ─── Easter Egg overlay components ───

export function EasterEggOverlays({
  stampede,
  fireBurst,
  prophecy,
  setProphecy,
  ghostPainting,
  warDrums,
  ancientCredits,
  setAncientCredits,
}: ReturnType<typeof useEasterEggs>) {
  return (
    <>
      {/* 1. Konami Code: Mammoth Stampede */}
      <AnimatePresence>
        {stampede && <MammothStampede />}
      </AnimatePresence>

      {/* 2. Type "fire": Screen edges catch fire */}
      <AnimatePresence>
        {fireBurst && <FireBurst />}
      </AnimatePresence>

      {/* 3. Ancient Prophecy (triggered by triple-click on title) */}
      <AnimatePresence>
        {prophecy && <AncientProphecy onClose={() => setProphecy(false)} />}
      </AnimatePresence>

      {/* 4. Ghost Painting (idle 30s) */}
      <AnimatePresence>
        {ghostPainting && <GhostPainting />}
      </AnimatePresence>

      {/* 5. War Drums (7 rapid clicks) */}
      <AnimatePresence>
        {warDrums && <WarDrums />}
      </AnimatePresence>

      {/* 6. Ancient Credits (hold emblem 3s) */}
      <AnimatePresence>
        {ancientCredits && <AncientCredits onClose={() => setAncientCredits(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Mammoth Stampede ───
function MammothStampede() {
  const mammoths = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    y: 30 + Math.random() * 40,
    size: 60 + Math.random() * 40,
    delay: i * 0.3,
    duration: 2.5 + Math.random() * 1.5,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Screen shake */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, -4, 4, -3, 3, -2, 2, 0],
          y: [0, 2, -2, 3, -1, 1, -2, 0],
        }}
        transition={{ repeat: 6, duration: 0.3 }}
      />

      {/* Dust cloud */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, hsl(var(--bone) / 0.15), transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.6, 0.8, 0] }}
        transition={{ duration: 4 }}
      />

      {/* Running mammoths */}
      {mammoths.map((m) => (
        <motion.div
          key={m.id}
          className="absolute"
          style={{ top: `${m.y}%` }}
          initial={{ x: "-150px" }}
          animate={{ x: "110vw" }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            ease: "linear",
          }}
        >
          <motion.svg
            width={m.size}
            height={m.size * 0.75}
            viewBox="0 0 120 90"
            fill="hsl(var(--bone) / 0.5)"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
          >
            <path d="M20 42 Q15 30 22 20 Q28 12 40 10 Q50 8 60 10 Q72 12 80 18 Q88 24 90 34 Q92 42 88 50 L88 70 Q88 74 86 74 L84 74 Q82 74 82 70 L82 56 L72 56 L72 72 Q72 76 70 76 L68 76 Q66 76 66 72 L66 56 L48 56 L48 72 Q48 76 46 76 L44 76 Q42 76 42 72 L42 56 L32 56 L32 70 Q32 74 30 74 L28 74 Q26 74 26 70 L26 52 Q22 50 20 46 Q18 44 20 42Z" />
            <path d="M30 20 Q34 4 48 6 Q54 7 52 14 Q50 18 44 18 Q36 18 30 20Z" />
            <path d="M90 38 Q100 42 106 50 Q110 58 106 64 Q102 70 96 66 Q94 62 100 56 Q104 50 100 44Z" />
            <path d="M20 42 Q14 38 10 32 Q8 28 10 26 Q12 24 14 28 Q16 34 20 38" fill="none" stroke="hsl(var(--bone) / 0.5)" strokeWidth="2.5" />
          </motion.svg>
        </motion.div>
      ))}

      {/* Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 3 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [3, 1, 1, 0.8] }}
        transition={{ duration: 4, times: [0, 0.2, 0.7, 1] }}
      >
        <p className="text-display text-4xl md:text-6xl font-bold" style={{ color: "hsl(var(--fire))", textShadow: "0 0 40px hsl(var(--fire) / 0.6)" }}>
          STAMPEDE!
        </p>
        <p className="font-heading text-xs tracking-[0.5em] uppercase mt-2" style={{ color: "hsl(var(--bone-muted))" }}>
          ↑↑↓↓←→←→BA
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Fire Burst (screen edges) ───
function FireBurst() {
  return (
    <motion.div
      className="fixed inset-0 z-[95] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Fire on all edges */}
      {["top", "bottom", "left", "right"].map((side) => (
        <motion.div
          key={side}
          className="absolute"
          style={{
            [side]: 0,
            ...(side === "top" || side === "bottom"
              ? { left: 0, right: 0, height: "120px" }
              : { top: 0, bottom: 0, width: "80px" }),
            background:
              side === "top"
                ? "linear-gradient(to bottom, hsl(var(--fire) / 0.6), hsl(var(--ember) / 0.2), transparent)"
                : side === "bottom"
                  ? "linear-gradient(to top, hsl(var(--fire) / 0.6), hsl(var(--ember) / 0.2), transparent)"
                  : side === "left"
                    ? "linear-gradient(to right, hsl(var(--fire) / 0.5), transparent)"
                    : "linear-gradient(to left, hsl(var(--fire) / 0.5), transparent)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.9, 0.7, 0.9, 0.5, 0],
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      ))}

      {/* Central flash text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5] }}
        transition={{ duration: 2 }}
      >
        <p className="text-display text-5xl font-bold text-fire" style={{ textShadow: "0 0 60px hsl(var(--fire) / 0.8), 0 0 120px hsl(var(--fire) / 0.4)" }}>
          🔥
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Ancient Prophecy (triple-click title) ───
function AncientProphecy({ onClose }: { onClose: () => void }) {
  const lines = [
    "When the hundredth voice speaks,",
    "the stones shall remember.",
    "When fire meets stone,",
    "a new age is born.",
    "— The First Elder, Year Zero",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <motion.div className="relative text-center max-w-lg">
        {/* Rune circle */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{
            border: "1px solid hsl(var(--fire) / 0.3)",
            boxShadow: "0 0 40px hsl(var(--fire) / 0.15), inset 0 0 20px hsl(var(--fire) / 0.1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <span className="text-3xl">𓀀</span>
        </motion.div>

        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`font-body ${i === lines.length - 1 ? "text-sm mt-6 text-bone-muted italic" : "text-xl md:text-2xl mb-3"}`}
            style={{ color: i < lines.length - 1 ? "hsl(var(--bone))" : undefined }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.6, duration: 0.8 }}
          >
            {line}
          </motion.p>
        ))}

        <motion.p
          className="font-heading text-xs tracking-[0.4em] uppercase mt-8"
          style={{ color: "hsl(var(--bone-muted))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 4 }}
        >
          Click anywhere to close
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── Ghost Painting (idle) ───
function GhostPainting() {
  // A spectral cave painting hand print drifts across
  return (
    <motion.div
      className="fixed z-[80] pointer-events-none"
      style={{ top: "40%", left: "-100px" }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: [0, 0.15, 0.15, 0], x: ["-100px", "50vw", "50vw", "110vw"] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 6, times: [0, 0.3, 0.7, 1] }}
    >
      <svg width="80" height="100" viewBox="0 0 80 100" fill="hsl(var(--fire) / 0.3)">
        {/* Cave handprint */}
        <path d="M40 95 Q30 85 25 70 Q20 55 22 45 Q24 35 30 30 Q28 22 25 15 Q22 8 26 5 Q30 2 32 8 Q34 14 33 22 L35 28 Q36 20 37 12 Q38 4 42 2 Q46 0 46 6 Q46 14 44 22 L43 30 Q46 22 48 14 Q50 6 54 5 Q58 4 56 12 Q54 20 52 28 L50 34 Q54 28 56 20 Q58 14 62 16 Q66 18 62 26 Q58 34 54 40 Q58 38 62 36 Q66 34 66 38 Q66 42 62 44 Q56 48 50 50 Q56 60 52 72 Q48 85 40 95Z" />
        {/* Palm */}
        <ellipse cx="40" cy="50" rx="14" ry="16" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

// ─── War Drums (7 rapid clicks) ───
function WarDrums() {
  const rings = Array.from({ length: 5 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-[85] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Pulsing concentric rings from center */}
      {rings.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            border: "2px solid hsl(var(--fire) / 0.4)",
            boxShadow: "0 0 20px hsl(var(--fire) / 0.15)",
          }}
          initial={{ width: 20, height: 20, opacity: 0.8 }}
          animate={{
            width: [20, 600],
            height: [20, 600],
            opacity: [0.8, 0],
          }}
          transition={{
            repeat: 4,
            duration: 1,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Screen pulse flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "hsl(var(--fire) / 0.08)" }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ repeat: 8, duration: 0.5 }}
      />

      {/* Drum icon */}
      <motion.div
        className="relative text-center"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: 8, duration: 0.5 }}
      >
        <p className="text-6xl">🥁</p>
        <motion.p
          className="font-heading text-xs tracking-[0.5em] uppercase mt-4 text-fire"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          War Drums Awaken
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── Ancient Credits (hold emblem 3s) ───
function AncientCredits({ onClose }: { onClose: () => void }) {
  const credits = [
    { role: "Chief Architect", name: "The Builder of Worlds" },
    { role: "Fire Keeper", name: "Guardian of the Flame" },
    { role: "Stone Carver", name: "The One Who Shapes" },
    { role: "Voice of the Tribe", name: "The Storyteller" },
    { role: "Beast Tamer", name: "Walker Among Giants" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/90" />
      <motion.div className="relative text-center max-w-md">
        <motion.p
          className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The Sacred Scroll
        </motion.p>

        <motion.div
          className="section-divider w-16 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {credits.map((credit, i) => (
          <motion.div
            key={i}
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.4, duration: 0.6 }}
          >
            <p className="font-heading text-xs tracking-[0.4em] uppercase text-fire mb-1">
              {credit.role}
            </p>
            <p className="font-body text-xl" style={{ color: "hsl(var(--bone))" }}>
              {credit.name}
            </p>
          </motion.div>
        ))}

        <motion.div
          className="section-divider w-16 mx-auto mt-8 mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        />

        <motion.p
          className="font-body text-sm italic text-bone-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 4 }}
        >
          "Every great thing begins around a fire."
        </motion.p>

        <motion.p
          className="font-heading text-xs tracking-[0.3em] uppercase mt-8"
          style={{ color: "hsl(var(--bone-muted))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4.5 }}
        >
          Click to return
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
