import { motion } from "framer-motion";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";
import { useEffect, useRef } from "react";

const TORCH_COUNT = 40;

const FireBorderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Generate torch positions along the border
    const getTorchPositions = () => {
      const positions: { x: number; y: number }[] = [];
      const perimeter = 2 * (w() + h());
      const spacing = perimeter / TORCH_COUNT;

      for (let i = 0; i < TORCH_COUNT; i++) {
        const d = i * spacing;
        let x: number, y: number;
        if (d < w()) { x = d; y = 0; }
        else if (d < w() + h()) { x = w(); y = d - w(); }
        else if (d < 2 * w() + h()) { x = w() - (d - w() - h()); y = h(); }
        else { x = 0; y = h() - (d - 2 * w() - h()); }
        positions.push({ x, y });
      }
      return positions;
    };

    // Particles per torch
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
      hue: number; brightness: number;
    };

    const particles: Particle[] = [];

    const spawnParticle = (tx: number, ty: number) => {
      particles.push({
        x: tx + (Math.random() - 0.5) * 6,
        y: ty + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -1 - Math.random() * 2.5,
        life: 0,
        maxLife: 30 + Math.random() * 40,
        size: 2 + Math.random() * 4,
        hue: 15 + Math.random() * 25,
        brightness: 50 + Math.random() * 40,
      });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      frame++;

      const torches = getTorchPositions();

      // Spawn particles from torches
      if (frame % 2 === 0) {
        torches.forEach((t) => {
          if (Math.random() < 0.7) spawnParticle(t.x, t.y);
        });
      }

      // Draw torch glow
      torches.forEach((t) => {
        const flickerR = 12 + Math.sin(frame * 0.15 + t.x * 0.1) * 5;
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, flickerR);
        grad.addColorStop(0, `hsla(24, 90%, 55%, 0.6)`);
        grad.addColorStop(0.4, `hsla(20, 80%, 45%, 0.25)`);
        grad.addColorStop(1, `hsla(20, 80%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(t.x - flickerR, t.y - flickerR, flickerR * 2, flickerR * 2);
      });

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.97;
        p.size *= 0.98;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0 || p.size < 0.3) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, ${p.brightness}%, ${alpha})`);
        grad.addColorStop(0.6, `hsla(${p.hue}, 90%, ${p.brightness * 0.6}%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 30%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Limit particle count
      while (particles.length > 800) particles.shift();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none w-full h-full"
    />
  );
};

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

      {/* Fire/torch border */}
      <FireBorderCanvas />

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
