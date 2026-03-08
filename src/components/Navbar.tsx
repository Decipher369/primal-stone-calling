import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tribalEmblem from "@/assets/tribal-emblem.png";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  // GSAP: navbar background appears on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 100) {
            gsap.to(nav, {
              backgroundColor: "hsla(25, 30%, 6%, 0.95)",
              backdropFilter: "blur(10px)",
              duration: 0.4,
            });
          } else if (self.scroll() <= 100) {
            gsap.to(nav, {
              backgroundColor: "hsla(25, 30%, 6%, 0)",
              backdropFilter: "blur(0px)",
              duration: 0.4,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="flex items-center gap-8">
        <motion.a href="#mission" className="nav-link hidden md:block" custom={0} variants={linkVariants} initial="hidden" animate="visible"
          whileHover={{ color: "hsl(var(--fire))", transition: { duration: 0.2 } }}
        >
          The Mission
        </motion.a>
        <motion.a href="#trials" className="nav-link hidden md:block" custom={1} variants={linkVariants} initial="hidden" animate="visible"
          whileHover={{ color: "hsl(var(--fire))", transition: { duration: 0.2 } }}
        >
          The Trials
        </motion.a>
      </div>

      <motion.a
        href="#"
        className="absolute left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        <img src={tribalEmblem} alt="Team Alpha" className="h-12 md:h-14 w-auto" />
      </motion.a>

      <div className="flex items-center gap-8">
        <motion.a href="#call" className="nav-link hidden md:block" custom={2} variants={linkVariants} initial="hidden" animate="visible"
          whileHover={{ color: "hsl(var(--fire))", transition: { duration: 0.2 } }}
        >
          Join
        </motion.a>
        <motion.a
          href="#call"
          className="btn-brand text-xs py-2 px-6 tracking-[0.25em]"
          custom={3}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ borderColor: "hsl(var(--fire))", color: "hsl(var(--fire))", boxShadow: "0 0 30px hsla(24, 80%, 50%, 0.2)" }}
        >
          Register
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
