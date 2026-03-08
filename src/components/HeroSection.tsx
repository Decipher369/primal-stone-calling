import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const subtitleTopRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleBottomRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Split title into individual letters for dramatic reveal
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? " "
              : `<span class="inline-block" style="opacity:0; transform:translateY(80px) scale(0.7)">${char}</span>`
          )
          .join("");

        const chars = titleRef.current.querySelectorAll("span");

        tl.to(chars, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "back.out(1.5)",
          delay: 0.6,
        });
      }

      // Subtitle top
      tl.fromTo(
        subtitleTopRef.current,
        { opacity: 0, y: 30, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "0.6em", duration: 1 },
        "-=0.4"
      );

      // Subtitle bottom
      tl.fromTo(
        subtitleBottomRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.3"
      );

      // Parallax: background moves slower than content on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fades and moves up on scroll out
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with slow zoom + parallax */}
      <div
        ref={bgRef}
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

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-4">
        <p
          ref={subtitleTopRef}
          className="font-heading text-xs md:text-sm tracking-[0.6em] uppercase mb-6 opacity-0"
          style={{ color: "hsl(var(--bone-muted))" }}
        >
          Ancient Voices
        </p>

        <h1
          ref={titleRef}
          className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.1em] leading-none mb-4"
          style={{ color: "hsl(var(--bone))", animation: "fire-flicker 4s ease-in-out infinite" }}
        >
          TEAM ALPHA
        </h1>

        <p
          ref={subtitleBottomRef}
          className="font-heading text-xs md:text-sm tracking-[0.6em] uppercase mt-6 opacity-0"
          style={{ color: "hsl(var(--bone-muted))" }}
        >
          Of Fire & The New Age
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0"
      >
        <div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, hsl(var(--bone) / 0.4), transparent)" }}
        />
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ color: "hsl(var(--bone-muted))" }}>
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
