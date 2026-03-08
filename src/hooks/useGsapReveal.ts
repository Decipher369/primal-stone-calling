import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  markers?: boolean;
};

/**
 * GSAP ScrollTrigger reveal hook — attaches to a container ref
 * and animates direct children (or a selector) when scrolled into view.
 */
export function useGsapReveal<T extends HTMLElement>(
  options: RevealOptions = {},
  selector?: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll(selector) : el.children;
    if (!targets.length) return;

    const {
      y = 60,
      x = 0,
      scale = 1,
      rotation = 0,
      duration = 1.2,
      delay = 0,
      stagger = 0.15,
      scrub = false,
      start = "top 85%",
      end = "top 20%",
    } = options;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        x,
        scale,
        rotation,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options, selector]);

  return ref;
}

/**
 * GSAP parallax effect for backgrounds
 */
export function useGsapParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * GSAP text split animation — animates each character
 */
export function useGsapTextReveal<T extends HTMLElement>(options: { delay?: number; stagger?: number } = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: options.stagger ?? 0.03,
        delay: options.delay ?? 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.set(chars, {
        y: 40,
        rotationX: -90,
        transformOrigin: "50% 50% -20px",
      });
    });

    return () => {
      ctx.revert();
      el.textContent = text;
    };
  }, [options.delay, options.stagger]);

  return ref;
}
