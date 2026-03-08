import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";


function useCountdown(targetDate: string) {
  const getTimeLeft = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const units = [
    { label: "SUNS", value: days },
    { label: "FIRES", value: hours },
    { label: "DRUMS", value: minutes },
    { label: "BEATS", value: seconds },
  ];

  // Stone-age tally: convert digit to scratchy tally marks (for small nums) or cave numeral
  const StoneDigit = ({ value, prev }: { value: number; prev?: number }) => (
    <motion.span
      key={value}
      className="inline-block tabular-nums"
      initial={{ opacity: 0.4, y: -4, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  );

  return (
    <motion.div
      className="mt-8 relative inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      {/* Realistic stone slab — small, rough, organic shape via clip-path */}
      <div
        className="relative px-4 py-3 md:px-6 md:py-4"
        style={{
          background: `
            radial-gradient(ellipse at 30% 25%, hsl(30 12% 22%) 0%, hsl(25 14% 16%) 40%, hsl(20 10% 12%) 100%)
          `,
          boxShadow: `
            inset 0 2px 6px hsl(0 0% 0% / 0.5),
            inset 0 -1px 3px hsl(var(--bone) / 0.04),
            0 4px 16px hsl(0 0% 0% / 0.7),
            0 1px 2px hsl(0 0% 0% / 0.4)
          `,
          clipPath: "polygon(3% 8%, 12% 1%, 45% 3%, 78% 0%, 95% 5%, 99% 18%, 97% 75%, 100% 88%, 94% 97%, 60% 100%, 28% 98%, 8% 100%, 1% 90%, 0% 40%)",
        }}
      >
        {/* Grainy stone texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, hsl(var(--bone) / 0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 30%, hsl(var(--bone) / 0.2) 1px, transparent 1px),
              radial-gradient(circle at 50% 80%, hsl(var(--bone) / 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "7px 7px, 11px 11px, 5px 5px",
          }}
        />

        {/* Subtle crack */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 200 60">
          <path d="M30 5 L33 25 L28 50" stroke="hsl(var(--bone))" strokeWidth="0.4" fill="none" />
          <path d="M160 8 L163 30 L158 55" stroke="hsl(var(--bone))" strokeWidth="0.3" fill="none" />
        </svg>

        {/* Timer row */}
        <div className="relative flex items-center justify-center gap-1.5 md:gap-3">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-1.5 md:gap-3">
              <div className="flex flex-col items-center min-w-[28px] md:min-w-[36px]">
                <span
                  className="text-sm md:text-lg tabular-nums leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "hsl(var(--bone) / 0.7)",
                    textShadow: "0 1px 0 hsl(0 0% 0% / 0.8)",
                  }}
                >
                  {String(u.value).padStart(2, "0")}
                </span>
                <span
                  className="text-[5px] md:text-[6px] tracking-[0.25em] uppercase mt-0.5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "hsl(var(--bone-muted) / 0.35)",
                  }}
                >
                  {u.label}
                </span>
              </div>

              {i < units.length - 1 && (
                <motion.span
                  className="text-[10px] md:text-xs -mt-2"
                  style={{ color: "hsl(var(--bone) / 0.25)" }}
                  animate={{ opacity: [0.4, 0.15, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  ·
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP: split "TEAM ALPHA" into individual chars with stagger reveal
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const words = ["TEAM", "ALPHA"];
    el.innerHTML = "";

    const allChars: HTMLSpanElement[] = [];

    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      if (wi === 0) {
        // Add line break on mobile
        const br = document.createElement("br");
        br.className = "md:hidden";
        wordSpan.appendChild(br);
      }

      word.split("").forEach((char) => {
        const s = document.createElement("span");
        s.textContent = char;
        s.style.display = "inline-block";
        wordSpan.appendChild(s);
        allChars.push(s);
      });

      el.appendChild(wordSpan);
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        space.className = "hidden md:inline-block";
        el.appendChild(space);
      }
    });

    const ctx = gsap.context(() => {
      gsap.set(allChars, {
        opacity: 0,
        y: 80,
        rotationX: -90,
        transformOrigin: "50% 100%",
      });

      gsap.to(allChars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.06,
        delay: 1.3,
        ease: "back.out(1.7)",
      });

      // Fire glow pulse after text lands
      gsap.to(el, {
        textShadow: "0 0 40px hsla(24, 80%, 50%, 0.8), 0 0 80px hsla(24, 80%, 50%, 0.4), 0 0 120px hsla(18, 85%, 55%, 0.25)",
        duration: 2,
        delay: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  // GSAP: parallax scroll on background
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bg = section.querySelector("[data-hero-bg]") as HTMLElement;
    if (!bg) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with parallax */}
      <div
        data-hero-bg
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${primalHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "slow-zoom 30s ease-in-out alternate infinite",
        }}
      />


      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, hsl(25 30% 6% / 0.6) 70%, hsl(25 30% 6% / 0.95) 100%),
            linear-gradient(to bottom, hsl(25 30% 6% / 0.3) 0%, transparent 30%, transparent 70%, hsl(25 30% 6% / 1) 100%)
          `,
        }}
      />

      {/* Bottom fire glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[3]"
        style={{
          background: "linear-gradient(to top, hsl(24 80% 50% / 0.08), transparent)",
        }}
      />

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

        <h1
          ref={titleRef}
          className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.1em] leading-none mb-4"
          style={{ color: "hsl(var(--bone))" }}
        >
          TEAM ALPHA
        </h1>

        <motion.p
          className="font-heading text-xs md:text-sm tracking-[0.6em] uppercase mt-6"
          style={{ color: "hsl(var(--bone-muted))" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          Of Fire & The New Age
        </motion.p>

        {/* Countdown Timer */}
        <CountdownTimer targetDate="2026-04-15T09:00:00" />
      </div>

      {/* Scroll indicator — Framer Motion spring bounce */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, hsl(var(--bone) / 0.4), transparent)" }}
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.svg
          width="16" height="10" viewBox="0 0 16 10" fill="none"
          style={{ color: "hsl(var(--bone-muted))" }}
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
