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

      {/* Stone arrow cursor */}
      <div
        className="absolute"
        style={{
          left: pos.x - 4,
          top: pos.y - 2,
          filter: "drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))",
        }}
      >
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          {/* Flint arrowhead */}
          <path
            d="M4 1 L14 13 L24 1 L14 5 Z"
            fill="hsl(25 15% 30%)"
            stroke="hsl(25 10% 22%)"
            strokeWidth="0.5"
          />
          {/* Arrowhead highlight edge */}
          <path d="M4 1 L14 13" stroke="hsl(var(--bone) / 0.15)" strokeWidth="0.5" />
          {/* Shaft */}
          <line x1="14" y1="13" x2="14" y2="32" stroke="hsl(30 20% 28%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wood grain */}
          <line x1="14" y1="16" x2="14" y2="17" stroke="hsl(30 15% 35%)" strokeWidth="1" opacity="0.4" />
          <line x1="14" y1="22" x2="14" y2="23" stroke="hsl(30 15% 35%)" strokeWidth="1" opacity="0.3" />
          <line x1="14" y1="28" x2="14" y2="29" stroke="hsl(30 15% 35%)" strokeWidth="1" opacity="0.3" />
          {/* Binding wrap */}
          <path d="M12.5 12 L15.5 13.5 L12.5 15 L15.5 16.5" stroke="hsl(25 30% 40%)" strokeWidth="0.8" fill="none" />
          {/* Fletching */}
          <path d="M14 29 L10 33 L14 31" fill="hsl(25 12% 35%)" opacity="0.7" />
          <path d="M14 29 L18 33 L14 31" fill="hsl(25 12% 35%)" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
};

export default TorchCursor;
