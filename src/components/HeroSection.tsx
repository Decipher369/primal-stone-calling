import { motion } from "framer-motion";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";
import { useEffect, useRef } from "react";

const EmberCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    type Ember = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      life: number; maxLife: number;
      hue: number; sat: number; light: number;
      wobbleSpeed: number; wobbleAmp: number;
      type: "spark" | "ember" | "ash";
    };

    const embers: Ember[] = [];

    const spawn = () => {
      const type = Math.random() < 0.15 ? "spark" : Math.random() < 0.7 ? "ember" : "ash";

      const ember: Ember = {
        x: Math.random() * w(),
        y: h() + 10 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.6,
        vy: type === "spark" ? -(2.5 + Math.random() * 3) : -(0.4 + Math.random() * 1.2),
        size: type === "spark" ? 1 + Math.random() * 2 : type === "ember" ? 1.5 + Math.random() * 3.5 : 0.8 + Math.random() * 1.5,
        life: 0,
        maxLife: type === "spark" ? 40 + Math.random() * 50 : 120 + Math.random() * 200,
        hue: type === "ash" ? 30 + Math.random() * 10 : 10 + Math.random() * 30,
        sat: type === "ash" ? 20 : 80 + Math.random() * 20,
        light: type === "spark" ? 70 + Math.random() * 25 : type === "ember" ? 45 + Math.random() * 25 : 25 + Math.random() * 15,
        wobbleSpeed: 0.02 + Math.random() * 0.04,
        wobbleAmp: 0.3 + Math.random() * 1.2,
        type,
      };
      embers.push(ember);
    };

    // Pre-fill some embers
    for (let i = 0; i < 60; i++) {
      spawn();
      const e = embers[embers.length - 1];
      e.y = Math.random() * h();
      e.life = Math.random() * e.maxLife * 0.6;
    }

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Spawn new embers
      if (Math.random() < 0.4) spawn();
      if (Math.random() < 0.08) spawn(); // occasional extra burst

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;

        // Wobble wind
        e.vx += Math.sin(e.life * e.wobbleSpeed) * e.wobbleAmp * 0.02;
        e.x += e.vx;
        e.y += e.vy;

        // Slight deceleration
        if (e.type !== "spark") e.vy *= 0.999;

        const progress = e.life / e.maxLife;
        
        // Fade: bright start, slow fade, quick end
        let alpha: number;
        if (progress < 0.1) alpha = progress / 0.1;
        else if (progress < 0.7) alpha = 1;
        else alpha = 1 - (progress - 0.7) / 0.3;
        alpha = Math.max(0, alpha);

        // Shrink near end
        const sizeMultiplier = progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1;
        const currentSize = e.size * sizeMultiplier;

        if (alpha <= 0 || currentSize < 0.2 || e.y < -20 || e.x < -20 || e.x > w() + 20) {
          embers.splice(i, 1);
          continue;
        }

        if (e.type === "spark") {
          // Bright sharp spark
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.fillStyle = `hsla(${e.hue}, 100%, 80%, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (e.type === "ember") {
          // Soft glowing ember
          const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize * 2);
          grad.addColorStop(0, `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.9})`);
          grad.addColorStop(0.5, `hsla(${e.hue}, ${e.sat}%, ${e.light * 0.6}%, ${alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${e.hue}, ${e.sat}%, ${e.light * 0.3}%, 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(e.x - currentSize * 2, e.y - currentSize * 2, currentSize * 4, currentSize * 4);
        } else {
          // Dim ash — just a tiny dot
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Cap particles
      while (embers.length > 200) embers.shift();

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
      className="absolute inset-0 z-[3] pointer-events-none w-full h-full"
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

      {/* Bottom fire glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
        style={{
          background: "linear-gradient(to top, hsl(24 80% 50% / 0.08), transparent)",
        }}
      />

      {/* Floating embers & sparks */}
      <EmberCanvas />

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
