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
      className="mt-10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      {/* Stone tablet */}
      <div
        className="relative mx-auto px-5 py-5 md:px-10 md:py-7 rounded-sm"
        style={{
          background: `
            linear-gradient(135deg, hsl(var(--cave-mid)) 0%, hsl(25 18% 15%) 50%, hsl(var(--cave-surface)) 100%)
          `,
          boxShadow: `
            var(--shadow-carved),
            0 8px 32px hsl(0 0% 0% / 0.6),
            inset 0 0 60px hsl(0 0% 0% / 0.3)
          `,
          border: "1px solid hsl(var(--border))",
        }}
      >
        {/* Crack lines - decorative SVG scratches */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]" preserveAspectRatio="none" viewBox="0 0 400 120">
          <path d="M0 30 Q50 25 100 35 T200 28 T300 38 T400 30" stroke="hsl(var(--bone))" strokeWidth="0.5" fill="none" />
          <path d="M20 80 Q80 75 150 85 T280 78 T400 82" stroke="hsl(var(--bone))" strokeWidth="0.3" fill="none" />
          <path d="M50 10 L55 50 L48 90" stroke="hsl(var(--bone))" strokeWidth="0.4" fill="none" />
          <path d="M320 5 L325 60 L318 115" stroke="hsl(var(--bone))" strokeWidth="0.3" fill="none" />
        </svg>

        {/* Chipped edges */}
        <div className="absolute -top-px left-[15%] w-[12%] h-[3px] bg-background rounded-b-full" />
        <div className="absolute -bottom-px right-[20%] w-[8%] h-[2px] bg-background rounded-t-full" />
        <div className="absolute -left-px top-[30%] w-[2px] h-[15%] bg-background rounded-r-full" />

        {/* Top scratched label */}
        <div className="text-center mb-3 md:mb-4">
          <span
            className="font-heading text-[8px] md:text-[10px] tracking-[0.5em] uppercase"
            style={{
              color: "hsl(var(--bone-muted) / 0.5)",
              textShadow: "0 1px 0 hsl(0 0% 0% / 0.5)",
            }}
          >
            ━━ The Gathering Begins ━━
          </span>
        </div>

        {/* Timer digits */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center">
                {/* Scratched number */}
                <div
                  className="relative px-2 md:px-4 py-1"
                  style={{
                    background: "linear-gradient(180deg, hsl(0 0% 0% / 0.2), hsl(0 0% 0% / 0.1))",
                    borderRadius: "2px",
                  }}
                >
                  {/* Scratch texture behind number */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        ${45 + i * 15}deg,
                        transparent,
                        transparent 3px,
                        hsl(var(--bone)) 3px,
                        hsl(var(--bone)) 3.5px
                      )`,
                    }}
                  />
                  <span
                    className="relative text-2xl sm:text-3xl md:text-5xl tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "hsl(var(--bone) / 0.85)",
                      textShadow: `
                        0 1px 0 hsl(0 0% 0% / 0.8),
                        0 0 15px hsl(var(--fire) / 0.2)
                      `,
                      WebkitTextStroke: "0.5px hsl(var(--bone) / 0.15)",
                    }}
                  >
                    <StoneDigit value={u.value} />
                  </span>
                </div>

                {/* Scratched label */}
                <span
                  className="mt-1.5 text-[7px] md:text-[9px] tracking-[0.35em] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "hsl(var(--bone-muted) / 0.45)",
                    textShadow: "0 1px 0 hsl(0 0% 0% / 0.5)",
                  }}
                >
                  {u.label}
                </span>

                {/* Tally marks below */}
                <div className="flex gap-[2px] mt-1 h-2">
                  {Array.from({ length: Math.min(u.value % 5 || 5, 5) }).map((_, t) => (
                    <motion.div
                      key={t}
                      className="w-[1.5px] h-full rounded-full"
                      style={{
                        background: "hsl(var(--bone) / 0.2)",
                        transform: `rotate(${-5 + t * 3}deg)`,
                      }}
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ repeat: Infinity, duration: 2 + t * 0.3, delay: t * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Separator: scratched dot */}
              {i < units.length - 1 && (
                <div className="flex flex-col gap-2 -mt-4">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--fire) / 0.4)" }}
                    animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--fire) / 0.4)" }}
                    animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom petroglyph decoration */}
        <div className="flex justify-center gap-4 mt-3 md:mt-4 opacity-[0.15]">
          <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 0L0 12h16z" fill="hsl(var(--bone))" /></svg>
          <svg width="16" height="12" viewBox="0 0 16 12"><circle cx="8" cy="6" r="5" stroke="hsl(var(--bone))" strokeWidth="1" fill="none" /><circle cx="8" cy="6" r="1.5" fill="hsl(var(--bone))" /></svg>
          <svg width="20" height="12" viewBox="0 0 20 12"><path d="M0 6Q5 0 10 6T20 6" stroke="hsl(var(--bone))" strokeWidth="1" fill="none" /></svg>
          <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 0L0 12h16z" fill="hsl(var(--bone))" /></svg>
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
