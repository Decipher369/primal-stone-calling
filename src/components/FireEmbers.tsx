import { useEffect, useRef } from "react";

/**
 * Far Cry Primal–style fire embers: irregular elongated sparks,
 * wind-swept drift, trailing glow, dense warm atmosphere.
 * Fixed fullscreen canvas overlay.
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

    // Global wind that shifts over time
    let windAngle = 0;
    let windStrength = 0;
    let windTarget = 0;
    let windAngleTarget = 0;

    type Ember = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      life: number; maxLife: number;
      hue: number; sat: number; light: number;
      angle: number; // rotation of the elongated shape
      spin: number; // rotation speed
      stretch: number; // elongation ratio (1 = circle, 2+ = stretched)
      wobblePhase: number; wobbleFreq: number;
      type: "bright-spark" | "ember" | "deep-ember" | "ash-fleck";
      flickerPhase: number; flickerSpeed: number;
      trail: { x: number; y: number; alpha: number }[];
    };

    const embers: Ember[] = [];

    const spawn = () => {
      const r = Math.random();
      const type: Ember["type"] =
        r < 0.06 ? "bright-spark" :
        r < 0.35 ? "ember" :
        r < 0.65 ? "deep-ember" : "ash-fleck";

      // Spawn mostly from bottom, some from sides
      let x: number, y: number;
      const edge = Math.random();
      if (edge < 0.8) {
        // Bottom
        x = Math.random() * W();
        y = H() + 10 + Math.random() * 40;
      } else if (edge < 0.9) {
        // Left side lower half
        x = -10;
        y = H() * 0.5 + Math.random() * H() * 0.5;
      } else {
        // Right side lower half
        x = W() + 10;
        y = H() * 0.5 + Math.random() * H() * 0.5;
      }

      const baseSpeed =
        type === "bright-spark" ? -(2.5 + Math.random() * 3) :
        type === "ember" ? -(0.8 + Math.random() * 1.8) :
        type === "deep-ember" ? -(0.4 + Math.random() * 1) :
        -(0.2 + Math.random() * 0.5);

      const size =
        type === "bright-spark" ? 1 + Math.random() * 2 :
        type === "ember" ? 1.5 + Math.random() * 3 :
        type === "deep-ember" ? 1 + Math.random() * 2.5 :
        0.4 + Math.random() * 1;

      embers.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: baseSpeed,
        size,
        life: 0,
        maxLife:
          type === "bright-spark" ? 40 + Math.random() * 60 :
          type === "ember" ? 120 + Math.random() * 200 :
          type === "deep-ember" ? 180 + Math.random() * 280 :
          200 + Math.random() * 300,
        hue:
          type === "bright-spark" ? 35 + Math.random() * 15 :
          type === "ember" ? 15 + Math.random() * 20 :
          type === "deep-ember" ? 5 + Math.random() * 15 :
          20 + Math.random() * 15,
        sat:
          type === "ash-fleck" ? 10 + Math.random() * 15 :
          80 + Math.random() * 20,
        light:
          type === "bright-spark" ? 80 + Math.random() * 15 :
          type === "ember" ? 55 + Math.random() * 20 :
          type === "deep-ember" ? 25 + Math.random() * 18 :
          12 + Math.random() * 8,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.08,
        stretch: type === "bright-spark" ? 2 + Math.random() * 2.5 :
                 type === "ember" ? 1.3 + Math.random() * 1.2 :
                 type === "deep-ember" ? 1.1 + Math.random() * 0.6 :
                 1 + Math.random() * 0.3,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq: 0.02 + Math.random() * 0.04,
        type,
        flickerPhase: Math.random() * Math.PI * 2,
        flickerSpeed: 0.08 + Math.random() * 0.25,
        trail: [],
      });
    };

    // Pre-fill scattered across screen
    for (let i = 0; i < 60; i++) {
      spawn();
      const e = embers[embers.length - 1];
      e.x = Math.random() * W();
      e.y = Math.random() * H();
      e.life = Math.random() * e.maxLife * 0.6;
    }

    let frame = 0;

    const draw = () => {
      frame++;

      // Semi-transparent clear for subtle trailing
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, W(), H());

      // Shift wind gradually
      if (frame % 120 === 0) {
        windTarget = (Math.random() - 0.5) * 0.8;
        windAngleTarget = Math.random() * Math.PI * 2;
      }
      windStrength += (windTarget - windStrength) * 0.005;
      windAngle += (windAngleTarget - windAngle) * 0.003;
      const globalWindX = Math.cos(windAngle) * windStrength;
      const globalWindY = Math.sin(windAngle) * windStrength * 0.3;

      // Spawn: ~2–4 per frame
      const spawnCount = 2 + Math.floor(Math.random() * 3);
      for (let s = 0; s < spawnCount; s++) {
        if (embers.length < 300) spawn();
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;

        // Physics: wind + wobble + drift
        e.wobblePhase += e.wobbleFreq;
        const wobble = Math.sin(e.wobblePhase) * 0.15;
        e.vx += globalWindX * 0.02 + wobble * 0.1;
        e.vy += globalWindY * 0.01;
        // Slight upward acceleration for hot particles
        if (e.type === "bright-spark" || e.type === "ember") {
          e.vy -= 0.008;
        }
        e.vx *= 0.992;
        e.vy *= 0.998;
        e.x += e.vx;
        e.y += e.vy;
        e.angle += e.spin;

        const progress = e.life / e.maxLife;

        // Alpha curve
        let alpha: number;
        if (progress < 0.03) alpha = progress / 0.03;
        else if (progress < 0.5) alpha = 1;
        else alpha = 1 - ((progress - 0.5) / 0.5);
        alpha = Math.max(0, Math.min(1, alpha));

        // Flicker
        e.flickerPhase += e.flickerSpeed;
        if (e.type !== "ash-fleck") {
          const flicker = 0.6 + 0.4 * Math.sin(e.flickerPhase) * Math.sin(e.flickerPhase * 0.7 + 1.3);
          alpha *= flicker;
        }

        // Size decay
        const sizeMult = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        const sz = e.size * sizeMult;

        if (alpha <= 0.01 || sz < 0.1 || e.y < -50 || e.x < -80 || e.x > W() + 80) {
          embers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.angle);

        if (e.type === "bright-spark") {
          // Hot white-yellow core, elongated teardrop
          ctx.globalCompositeOperation = "lighter";

          // Outer glow
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 6);
          g.addColorStop(0, `hsla(${e.hue}, 100%, 80%, ${alpha * 0.4})`);
          g.addColorStop(0.3, `hsla(${e.hue}, 95%, 55%, ${alpha * 0.15})`);
          g.addColorStop(1, `hsla(${e.hue}, 80%, 30%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(-sz * 6, -sz * 6, sz * 12, sz * 12);

          // Elongated bright core
          ctx.beginPath();
          ctx.ellipse(0, 0, sz * 0.4, sz * e.stretch * 0.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(45, 100%, 92%, ${alpha * 0.95})`;
          ctx.fill();

          // Inner hot glow
          ctx.beginPath();
          ctx.ellipse(0, 0, sz * 0.8, sz * e.stretch * 0.9, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${e.hue}, 100%, 70%, ${alpha * 0.5})`;
          ctx.fill();

        } else if (e.type === "ember") {
          ctx.globalCompositeOperation = "lighter";

          // Soft glow halo
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 3.5);
          g.addColorStop(0, `hsla(${e.hue}, ${e.sat}%, ${e.light + 10}%, ${alpha * 0.5})`);
          g.addColorStop(0.4, `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.2})`);
          g.addColorStop(1, `hsla(${e.hue}, ${e.sat * 0.6}%, ${e.light * 0.3}%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(-sz * 3.5, -sz * 3.5, sz * 7, sz * 7);

          // Elongated ember body
          ctx.beginPath();
          ctx.ellipse(0, 0, sz * 0.5, sz * e.stretch * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light + 15}%, ${alpha * 0.8})`;
          ctx.fill();

        } else if (e.type === "deep-ember") {
          // Dim reddish, slight glow
          ctx.globalCompositeOperation = "lighter";
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 2);
          g.addColorStop(0, `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.55})`);
          g.addColorStop(0.5, `hsla(${e.hue}, ${e.sat * 0.6}%, ${e.light * 0.5}%, ${alpha * 0.15})`);
          g.addColorStop(1, `hsla(${e.hue}, 30%, 10%, 0)`);
          ctx.fillStyle = g;
          ctx.fillRect(-sz * 2, -sz * 2, sz * 4, sz * 4);

          ctx.beginPath();
          ctx.ellipse(0, 0, sz * 0.35, sz * e.stretch * 0.4, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light + 8}%, ${alpha * 0.6})`;
          ctx.fill();

        } else {
          // Ash fleck: tiny irregular
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light}%, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, sz * 0.6, sz * e.stretch * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Cap particles
      while (embers.length > 300) embers.shift();

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
