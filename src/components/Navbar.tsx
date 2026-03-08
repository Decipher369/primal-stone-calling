import { motion } from "framer-motion";
import tribalEmblem from "@/assets/tribal-emblem.png";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="flex items-center gap-8">
        <a href="#mission" className="nav-link hidden md:block">The Mission</a>
        <a href="#trials" className="nav-link hidden md:block">The Trials</a>
      </div>

      <a href="#" className="absolute left-1/2 -translate-x-1/2">
        <img src={tribalEmblem} alt="Team Alpha" className="h-12 md:h-14 w-auto opacity-90 hover:opacity-100 transition-opacity" />
      </a>

      <div className="flex items-center gap-8">
        <a href="#call" className="nav-link hidden md:block">Join</a>
        <a href="#call" className="btn-brand text-xs py-2 px-6 tracking-[0.25em]">
          Register
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
