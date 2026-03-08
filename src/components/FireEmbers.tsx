import { useEffect, useRef } from "react";

/**
 * Full-page floating fire sparks — realistic ember particles rising from below
 * like a wildfire or campfire scene from Far Cry Primal.
 * Fixed position, covers the entire viewport, always visible while scrolling.
 */
const FireEmbers = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    type Ember = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; originalSize: number;
      life: number; maxLife: number;
      hue: number; sat: number; light: number;
      wobblePhase: number; wobbleFreq: number; wobbleAmp: number;
      type: "spark" | "hot-ember" | "cool-ember" | "ash";
      flickerPhase: number; flickerSpeed: number;
    };

    const embers: Ember[] = [];

    const spawn = () => {
      const r = Math.random();
      const type: Ember["type"] = r < 0.08 ? "spark" : r < 0.4 ? "hot-ember" : r < 0.75 ? "cool-ember" : "ash";

      const size =
        type === "spark" ? 0.8 + Math.random() * 1.5 :
        type === "hot-ember" ? 1.2 + Math.random() * 2.5 :
        type === "cool-ember" ? 1 + Math.random() * 2 :
        0.5 + Math.random() * 1.2;

      const speed =
        type === "spark" ? -(3 + Math.random() * 4) :
        type === "hot-ember" ? -(0.6 + Math.random() * 1.5) :
        type === "cool-ember" ? -(0.3 + Math.random() * 0.8) :
        -(0.15 + Math.random() * 0.4);

      embers.push({
        x: Math.random() * W(),
        y: H() + 20 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.3,
        vy: speed,
        size,
        originalSize: size,
        life: 0,
        maxLife:
          type === "spark" ? 30 + Math.random() * 40 :
          type === "hot-ember" ? 150 + Math.random() * 200 :
          type === "cool-ember" ? 200 + Math.random() * 300 :
          250 + Math.random() * 350,
        hue: type === "ash" ? 25 + Math.random() * 15 : 8 + Math.random() * 28,
        sat: type === "ash" ? 15 + Math.random() * 10 : 85 + Math.random() * 15,
        light:
          type === "spark" ? 75 + Math.random() * 20 :
          type === "hot-ember" ? 50 + Math.random() * 20 :
          type === "cool-ember" ? 30 + Math.random() * 20 :
          15 + Math.random() * 10,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq: 0.008 + Math.random() * 0.02,
        wobbleAmp: type === "spark" ? 0.1 : 0.3 + Math.random() * 0.8,
        type,
        flickerPhase: Math.random() * Math.PI * 2,
        flickerSpeed: 0.1 + Math.random() * 0.2,
      });
    };

    // Pre-fill
    for (let i = 0; i < 80; i++) {
      spawn();
      const e = embers[embers.length - 1];
      e.y = Math.random() * H();
      e.life = Math.random() * e.maxLife * 0.5;
    }

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Spawn rate: ~2-3 per frame
      for (let s = 0; s < 3; s++) {
        if (Math.random() < 0.6) spawn();
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;

        // Wind drift with wobble
        e.wobblePhase += e.wobbleFreq;
        e.vx += Math.sin(e.wobblePhase) * e.wobbleAmp * 0.015;
        // Slight global wind
        e.vx += 0.002;
        e.x += e.vx;
        e.y += e.vy;

        // Slow down gradually
        e.vx *= 0.995;

        const progress = e.life / e.maxLife;

        // Alpha curve: fade in quickly, hold, fade out
        let alpha: number;
        if (progress < 0.05) alpha = progress / 0.05;
        else if (progress < 0.6) alpha = 1;
        else alpha = 1 - ((progress - 0.6) / 0.4);
        alpha = Math.max(0, Math.min(1, alpha));

        // Flicker for hot embers/sparks
        if (e.type === "spark" || e.type === "hot-ember") {
          e.flickerPhase += e.flickerSpeed;
          const flicker = 0.7 + 0.3 * Math.sin(e.flickerPhase);
          alpha *= flicker;
        }

        // Size: shrink toward end
        const sizeMult = progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;
        const currentSize = e.size * sizeMult;

        if (alpha <= 0.01 || currentSize < 0.15 || e.y < -30) {
          embers.splice(i, 1);
          continue;
        }

        if (e.type === "spark") {
          // Bright white-hot core with orange glow
          ctx.globalCompositeOperation = "lighter";
          // Core
          ctx.fillStyle = `hsla(40, 100%, 95%, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
          // Hot glow
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize * 4);
          g.addColorStop(0, `hsla(${e.hue}, 100%, 70%, ${alpha * 0.5})`);
          g.addColorStop(0.5, `hsla(${e.hue}, 90%, 50%, ${alpha * 0.15})`);
          g.addColorStop(1, `hsla(${e.hue}, 80%, 30%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(e.x - currentSize * 4, e.y - currentSize * 4, currentSize * 8, currentSize * 8);
          ctx.globalCompositeOperation = "source-over";
        } else if (e.type === "hot-ember") {
          // Glowing ember with soft halo
          ctx.globalCompositeOperation = "lighter";
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize * 2.5);
          g.addColorStop(0, `hsla(${e.hue}, ${e.sat}%, ${e.light + 15}%, ${alpha * 0.8})`);
          g.addColorStop(0.3, `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.5})`);
          g.addColorStop(0.7, `hsla(${e.hue}, ${e.sat - 10}%, ${e.light * 0.5}%, ${alpha * 0.15})`);
          g.addColorStop(1, `hsla(${e.hue}, ${e.sat}%, ${e.light * 0.3}%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(e.x - currentSize * 2.5, e.y - currentSize * 2.5, currentSize * 5, currentSize * 5);
          ctx.globalCompositeOperation = "source-over";
        } else if (e.type === "cool-ember") {
          // Dimmer, reddish ember
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize * 1.8);
          g.addColorStop(0, `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.6})`);
          g.addColorStop(0.5, `hsla(${e.hue}, ${e.sat * 0.7}%, ${e.light * 0.5}%, ${alpha * 0.2})`);
          g.addColorStop(1, `hsla(${e.hue}, 40%, 15%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(e.x - currentSize * 1.8, e.y - currentSize * 1.8, currentSize * 3.6, currentSize * 3.6);
        } else {
          // Ash: tiny dim dot
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      while (embers.length > 250) embers.shift();

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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    />
  );
};

export default FireEmbers;
