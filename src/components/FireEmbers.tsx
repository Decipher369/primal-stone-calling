import { useEffect, useRef } from "react";

/**
 * Far Cry Primal style embers — large, organic, glowing chunks of fire
 * drifting slowly through darkness. Like embers from a massive bonfire
 * caught in an updraft on a prehistoric night.
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
      // Irregular shape
      radiusX: number; radiusY: number;
      rotation: number; rotSpeed: number;
      life: number; maxLife: number;
      // Color
      hue: number; coreBrightness: number;
      // Pulsing glow
      pulsePhase: number; pulseSpeed: number;
      // Drift wobble
      wobblePhase: number; wobbleFreq: number; wobbleAmp: number;
      // Size category
      scale: number;
    };

    const embers: Ember[] = [];

    const spawn = () => {
      // Mostly medium/large embers with occasional small
      const r = Math.random();
      const scale = r < 0.3 ? 2 + Math.random() * 4 :   // small ember
                    r < 0.7 ? 4 + Math.random() * 7 :    // medium
                              7 + Math.random() * 12;     // large chunk

      embers.push({
        x: Math.random() * W(),
        y: H() + 30 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.2 + Math.random() * 0.6),  // slow rise
        radiusX: scale * (0.6 + Math.random() * 0.4),
        radiusY: scale * (0.4 + Math.random() * 0.6),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        life: 0,
        maxLife: 300 + Math.random() * 500,  // long-lived
        hue: 8 + Math.random() * 25,   // deep red to orange
        coreBrightness: 50 + Math.random() * 30,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq: 0.005 + Math.random() * 0.012,
        wobbleAmp: 0.15 + Math.random() * 0.4,
        scale,
      });
    };

    // Pre-fill screen with embers at various stages
    for (let i = 0; i < 40; i++) {
      spawn();
      const e = embers[embers.length - 1];
      e.y = Math.random() * H();
      e.life = Math.random() * e.maxLife * 0.4;
    }

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Spawn ~1 per few frames for a gentle flow
      if (Math.random() < 0.35) spawn();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;

        // Slow drift with wobble
        e.wobblePhase += e.wobbleFreq;
        e.vx += Math.sin(e.wobblePhase) * e.wobbleAmp * 0.005;
        e.x += e.vx;
        e.y += e.vy;
        e.rotation += e.rotSpeed;
        e.vx *= 0.998;

        const progress = e.life / e.maxLife;

        // Alpha: fade in, hold, long fade out (embers cool slowly)
        let alpha: number;
        if (progress < 0.08) alpha = progress / 0.08;
        else if (progress < 0.4) alpha = 1;
        else alpha = 1 - ((progress - 0.4) / 0.6);
        alpha = Math.max(0, Math.min(1, alpha));

        // Pulsing glow — embers flicker as they burn
        e.pulsePhase += e.pulseSpeed;
        const pulse = 0.6 + 0.4 * Math.sin(e.pulsePhase);
        const glowAlpha = alpha * pulse;

        // Shrink as they cool
        const sizeMult = progress > 0.5 ? 1 - (progress - 0.5) * 0.6 : 1;
        const rx = e.radiusX * sizeMult;
        const ry = e.radiusY * sizeMult;

        if (alpha <= 0.01 || rx < 0.3 || e.y < -50) {
          embers.splice(i, 1);
          continue;
        }

        // Color shifts from bright orange to deep red as it cools
        const coolingHue = e.hue - progress * 5;  // shift redder
        const coolingLight = e.coreBrightness - progress * 20;

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rotation);

        // Outer glow halo (large, soft)
        ctx.globalCompositeOperation = "lighter";
        const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 4);
        outerGlow.addColorStop(0, `hsla(${coolingHue}, 90%, ${coolingLight}%, ${glowAlpha * 0.15})`);
        outerGlow.addColorStop(0.3, `hsla(${coolingHue}, 80%, ${coolingLight * 0.6}%, ${glowAlpha * 0.06})`);
        outerGlow.addColorStop(1, `hsla(${coolingHue}, 70%, 20%, 0)`);
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * 4, ry * 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Mid glow
        const midGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 2);
        midGlow.addColorStop(0, `hsla(${coolingHue + 5}, 95%, ${coolingLight + 10}%, ${glowAlpha * 0.4})`);
        midGlow.addColorStop(0.5, `hsla(${coolingHue}, 85%, ${coolingLight}%, ${glowAlpha * 0.15})`);
        midGlow.addColorStop(1, `hsla(${coolingHue}, 70%, ${coolingLight * 0.4}%, 0)`);
        ctx.fillStyle = midGlow;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * 2, ry * 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hot core — the actual ember shape (irregular ellipse)
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
        coreGrad.addColorStop(0, `hsla(${coolingHue + 15}, 100%, ${Math.min(coolingLight + 25, 90)}%, ${glowAlpha * 0.9})`);
        coreGrad.addColorStop(0.4, `hsla(${coolingHue + 8}, 95%, ${coolingLight + 10}%, ${glowAlpha * 0.7})`);
        coreGrad.addColorStop(0.8, `hsla(${coolingHue}, 85%, ${coolingLight * 0.7}%, ${glowAlpha * 0.3})`);
        coreGrad.addColorStop(1, `hsla(${coolingHue - 3}, 70%, ${coolingLight * 0.3}%, 0)`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      }

      while (embers.length > 120) embers.shift();

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
