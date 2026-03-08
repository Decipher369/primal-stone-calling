import { motion } from "framer-motion";
import primalHeroBg from "@/assets/primal-hero-bg.jpg";

const CallToAction = () => {
  return (
    <section id="call" className="relative py-32 md:py-48 px-4 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${primalHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, hsl(25 30% 6% / 0.7) 0%, hsl(25 30% 6% / 0.9) 70%),
            linear-gradient(to bottom, hsl(25 30% 6% / 1) 0%, transparent 15%, transparent 85%, hsl(25 30% 6% / 1) 100%)
          `,
        }}
      />

      <div className="container mx-auto max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">Answer the Call</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight mb-8">
            Carve Your Name<br />Into History
          </h2>
          <p className="text-lg md:text-xl font-body leading-relaxed text-bone-muted max-w-lg mx-auto mb-14">
            The stones have spoken. The fire awaits your mark. Join the tribe — let your voice echo through the ages.
          </p>

          <motion.a
            href="#"
            className="btn-brand-filled text-base md:text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join the Tribe
          </motion.a>

          <p className="font-heading text-xs tracking-[0.4em] uppercase text-bone-muted mt-10">
            Limited to 100 Warriors
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
