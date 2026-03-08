import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stoneLeftImg from "@/assets/stone-left.png";
import stoneRightImg from "@/assets/stone-right.png";

interface Spark {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  duration: number;
  color: string;
}

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [phase, setPhase] = useState<"idle" | "clash" | "sparks" | "reveal" | "done">("idle");
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateSparks = useCallback(() => {
    const newSparks: Spark[] = [];
    const colors = [
      "hsl(24, 85%, 50%)",
      "hsl(30, 100%, 60%)",
      "hsl(15, 90%, 55%)",
      "hsl(40, 95%, 65%)",
      "hsl(45, 100%, 80%)",
    ];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 400;
      newSparks.push({
        id: i,
        x: 0,
        y: 0,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - Math.random() * 200,
        size: 2 + Math.random() * 6,
        duration: 0.4 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setSparks(newSparks);
  }, []);

  const handleTrigger = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("clash");

    setTimeout(() => {
      setShowFlash(true);
      generateSparks();
      setPhase("sparks");
      setTimeout(() => setShowFlash(false), 600);
    }, 750);

    setTimeout(() => {
      setPhase("reveal");
    }, 2200);

    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4500);
  }, [phase, generateSparks, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent | WheelEvent) => {
      handleTrigger();
    };
    window.addEventListener("click", handler);
    window.addEventListener("wheel", handler);
    window.addEventListener("keydown", handler);
    window.addEventListener("touchstart", handler as any);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("wheel", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler as any);
    };
  }, [handleTrigger]);

  const isDone = phase === ("done" as string);
  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "hsl(0, 0%, 2%)" }}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 z-30"
            style={{ background: "radial-gradient(circle, hsl(40, 100%, 80%), hsl(24, 85%, 50%), transparent)" }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* Sparks */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute rounded-full"
            style={{
              width: spark.size,
              height: spark.size,
              backgroundColor: spark.color,
              boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: spark.tx, y: spark.ty, opacity: 0, scale: 0 }}
            transition={{ duration: spark.duration, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Floating embers (after clash) */}
      {(phase === "sparks" || phase === "reveal") && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                backgroundColor: `hsl(${20 + Math.random() * 20}, 90%, ${50 + Math.random() * 30}%)`,
                left: `${10 + Math.random() * 80}%`,
                bottom: `${Math.random() * 40}%`,
                boxShadow: `0 0 6px hsl(24, 85%, 50%)`,
              }}
              initial={{ y: 0, opacity: 0.8 }}
              animate={{ y: -200 - Math.random() * 300, opacity: 0, scale: 0.3 }}
              transition={{ duration: 2 + Math.random() * 3, ease: "easeOut", delay: Math.random() * 1 }}
            />
          ))}
        </div>
      )}

      {/* Left Stone */}
      <motion.img
        src={stoneLeftImg}
        alt="Stone"
        className="absolute z-10 h-[50vh] md:h-[70vh] max-w-none select-none"
        style={{ right: "50%", marginRight: "-2%" }}
        initial={{ x: "-50vw" }}
        animate={
          phase === "idle"
            ? { x: "-50vw" }
            : phase === "clash" || phase === "sparks"
            ? { x: 0 }
            : { x: "-60vw" }
        }
        transition={
          phase === "reveal" || phase === "done"
            ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
      />

      {/* Right Stone */}
      <motion.img
        src={stoneRightImg}
        alt="Stone"
        className="absolute z-10 h-[50vh] md:h-[70vh] max-w-none select-none"
        style={{ left: "50%", marginLeft: "-2%" }}
        initial={{ x: "50vw" }}
        animate={
          phase === "idle"
            ? { x: "50vw" }
            : phase === "clash" || phase === "sparks"
            ? { x: 0 }
            : { x: "60vw" }
        }
        transition={
          phase === "reveal" || phase === "done"
            ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
      />

      {/* Logo Reveal */}
      <AnimatePresence>
        {(phase === "reveal") && (
          <motion.div
            className="absolute z-20 text-center"
            initial={{ opacity: 0, scale: 0.8, filter: "brightness(3) blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1
              className="text-display text-fire text-4xl sm:text-6xl md:text-8xl font-black tracking-wider"
              style={{ animation: "fire-flicker 2s ease-in-out infinite" }}
            >
              TEAM ALPHA
            </h1>
            <motion.p
              className="text-carved text-lg sm:text-xl md:text-2xl mt-4 tracking-[0.3em] uppercase font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt text */}
      {phase === "idle" && (
        <motion.p
          className="absolute bottom-12 text-muted-foreground text-sm sm:text-base tracking-widest uppercase font-heading z-30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click or scroll to ignite
        </motion.p>
      )}
    </motion.div>
  );
};

export default IntroSequence;
