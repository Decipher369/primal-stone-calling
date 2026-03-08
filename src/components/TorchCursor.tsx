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

      {/* Stone-age pointer arrow (default cursor shape) */}
      <div
        className="absolute"
        style={{
          left: pos.x,
          top: pos.y,
          filter: "drop-shadow(0 1px 3px hsl(0 0% 0% / 0.6))",
        }}
      >
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          {/* Main pointer shape — classic arrow */}
          <path
            d="M2 1 L2 22 L7 17 L12 26 L15 24.5 L10 16 L17 16 Z"
            fill="hsl(28 18% 28%)"
            stroke="hsl(25 12% 18%)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Stone texture highlight */}
          <path
            d="M3 3 L3 19 L7.5 15 L10 14.5"
            stroke="hsl(var(--bone) / 0.12)"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Rough chipped edge detail */}
          <path
            d="M2 8 L3.5 8.5 M2 14 L3.2 13.5"
            stroke="hsl(var(--bone) / 0.08)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default TorchCursor;
