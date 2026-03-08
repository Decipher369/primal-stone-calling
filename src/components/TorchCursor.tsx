import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Footprint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
}

const TorchCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const lastPrint = useRef({ x: -100, y: -100 });
  const stepCount = useRef(0);
  const idCounter = useRef(0);
  const lastAngle = useRef(0);

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });

    const dx = e.clientX - lastPrint.current.x;
    const dy = e.clientY - lastPrint.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 50) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      lastAngle.current = angle;
      const isLeft = stepCount.current % 2 === 0;
      const offset = isLeft ? -8 : 8;
      const perpX = Math.cos((angle - 90) * Math.PI / 180) * offset;
      const perpY = Math.sin((angle - 90) * Math.PI / 180) * offset;

      const newPrint: Footprint = {
        id: idCounter.current++,
        x: e.clientX + perpX,
        y: e.clientY + perpY,
        rotation: angle + (isLeft ? -10 : 10),
        isLeft,
      };

      stepCount.current++;
      lastPrint.current = { x: e.clientX, y: e.clientY };

      setFootprints((prev) => [...prev.slice(-14), newPrint]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.style.cursor = "";
    };
  }, [handleMove]);

  // Clean old footprints
  useEffect(() => {
    const interval = setInterval(() => {
      setFootprints((prev) => prev.length > 0 ? prev.slice(1) : prev);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Footprint trails */}
      <AnimatePresence>
        {footprints.map((fp) => (
          <motion.div
            key={fp.id}
            className="absolute"
            style={{
              left: fp.x - 8,
              top: fp.y - 10,
              transform: `rotate(${fp.rotation}deg)`,
            }}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* SVG footprint */}
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              {/* Foot pad */}
              <ellipse cx="8" cy="13" rx="5" ry="6" fill="hsl(var(--bone) / 0.15)" />
              {/* Toes */}
              <circle cx="4" cy="5" r="2" fill="hsl(var(--bone) / 0.12)" />
              <circle cx="8" cy="3.5" r="2.2" fill="hsl(var(--bone) / 0.12)" />
              <circle cx="12" cy="5" r="2" fill="hsl(var(--bone) / 0.12)" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Torch cursor */}
      <div
        className="absolute"
        style={{
          left: pos.x - 12,
          top: pos.y - 28,
          filter: "drop-shadow(0 0 8px hsl(var(--fire) / 0.6))",
        }}
      >
        {/* Torch SVG */}
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
          {/* Handle */}
          <rect x="10" y="16" width="4" height="18" rx="1.5" fill="hsl(30 25% 25%)" />
          <rect x="10.5" y="16" width="1" height="18" rx="0.5" fill="hsl(30 20% 30%)" opacity="0.4" />
          {/* Wrap */}
          <rect x="9" y="15" width="6" height="4" rx="1" fill="hsl(25 20% 20%)" />
          {/* Flame outer */}
          <motion.path
            d="M12 2 C6 8 5 12 8 16 C9 14 10 12 12 11 C14 12 15 14 16 16 C19 12 18 8 12 2Z"
            fill="hsl(var(--fire) / 0.7)"
            animate={{
              d: [
                "M12 2 C6 8 5 12 8 16 C9 14 10 12 12 11 C14 12 15 14 16 16 C19 12 18 8 12 2Z",
                "M12 1 C7 7 4 11 8 16 C9 13 11 11 12 10 C13 11 15 13 16 16 C20 11 17 7 12 1Z",
                "M12 2 C6 8 5 12 8 16 C9 14 10 12 12 11 C14 12 15 14 16 16 C19 12 18 8 12 2Z",
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
          />
          {/* Flame inner */}
          <motion.path
            d="M12 6 C9 10 9 12 10 15 C11 13 11.5 12 12 11.5 C12.5 12 13 13 14 15 C15 12 15 10 12 6Z"
            fill="hsl(var(--ember) / 0.9)"
            animate={{
              d: [
                "M12 6 C9 10 9 12 10 15 C11 13 11.5 12 12 11.5 C12.5 12 13 13 14 15 C15 12 15 10 12 6Z",
                "M12 5 C10 9 9 11 10 15 C11 12 11.5 11 12 10.5 C12.5 11 13 12 14 15 C15 11 14 9 12 5Z",
                "M12 6 C9 10 9 12 10 15 C11 13 11.5 12 12 11.5 C12.5 12 13 13 14 15 C15 12 15 10 12 6Z",
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
          />
          {/* Flame core */}
          <ellipse cx="12" cy="11" rx="2" ry="3" fill="hsl(45 100% 80% / 0.8)" />
        </svg>

        {/* Ambient glow */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--fire) / 0.15) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default TorchCursor;
