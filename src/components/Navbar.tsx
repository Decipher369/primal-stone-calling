import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tribalEmblem from "@/assets/tribal-emblem.png";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onRegisterClick: () => void;
}

const Navbar = ({ onRegisterClick }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.1, duration: 0.6 },
    }),
  };

  const menuLinks = [
    { label: "The Mission", href: "#mission" },
    { label: "The Trials", href: "#trials" },
    { label: "Join", href: "#call" },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Hamburger - mobile only */}
        <motion.button
          className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.span
            className="block w-6 h-[2px] bg-bone rounded-full origin-center"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-[2px] bg-bone rounded-full"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-[2px] bg-bone rounded-full origin-center"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

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
          <motion.button
            onClick={onRegisterClick}
            className="btn-brand text-xs py-2 px-6 tracking-[0.25em] hidden md:block"
            custom={3}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ borderColor: "hsl(var(--fire))", color: "hsl(var(--fire))", boxShadow: "0 0 30px hsla(24, 80%, 50%, 0.2)" }}
          >
            Register
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 bottom-0 z-[58] w-[280px] bg-card border-r border-border overflow-hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Fire glow overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 30% 20%, hsl(var(--fire) / 0.15), transparent 60%), radial-gradient(circle at 70% 80%, hsl(var(--ember) / 0.1), transparent 50%)",
                }}
              />

              <div className="relative flex flex-col h-full pt-24 px-8">
                <motion.div
                  className="mb-10 flex justify-center"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                >
                  <img src={tribalEmblem} alt="" className="h-16 w-auto opacity-60" />
                </motion.div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8" />

                <nav className="flex flex-col gap-2">
                  {menuLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative py-4 px-4 font-heading text-lg tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-primary"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-full group-hover:h-6 transition-all duration-300"
                        style={{ boxShadow: "0 0 12px hsl(var(--fire) / 0.6)" }}
                      />
                      <span className="ml-2">{link.label}</span>
                    </motion.a>
                  ))}
                </nav>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-8" />

                <motion.button
                  onClick={() => { setMenuOpen(false); onRegisterClick(); }}
                  className="btn-brand text-xs py-3 px-8 tracking-[0.25em] w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ boxShadow: "0 0 30px hsla(24, 80%, 50%, 0.3)" }}
                >
                  Register
                </motion.button>

                <div className="mt-auto pb-8 flex justify-center gap-6 opacity-20">
                  {["◈", "◇", "△", "◈"].map((sym, i) => (
                    <motion.span
                      key={i}
                      className="text-foreground text-xl"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.3 }}
                    >
                      {sym}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
