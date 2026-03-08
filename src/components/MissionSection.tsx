import { motion } from "framer-motion";
import petroglyphGathering from "@/assets/petroglyph-gathering.png";
import darkCaveBg from "@/assets/dark-cave-bg.jpg";

const MissionSection = () => {
  return (
    <section id="mission" className="relative py-28 md:py-40 px-4 overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${darkCaveBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "hsl(var(--cave-deep))" , opacity: 0.85 }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">The Mission</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved leading-tight">
            The Gathering<br />of the 100
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl font-body leading-relaxed mb-8" style={{ color: "hsl(var(--bone))" }}>
              From every corner of the land, 100 warriors answer the call. Not chosen by blood, but by fire — the fire to speak, to lead, to conquer.
            </p>
            <p className="text-lg font-body leading-relaxed text-bone-muted mb-10">
              This is not a competition. This is a proving ground. Each delegate will be forged through trials of voice and will, emerging as leaders of a new age.
            </p>
            <div className="section-divider-thick w-24" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="petroglyph-card p-8 max-w-sm">
              <img
                src={petroglyphGathering}
                alt="The Gathering — primitive cave art depicting the assembly"
                className="w-full opacity-70 mix-blend-screen"
              />
              <p className="text-center font-heading text-xs tracking-[0.4em] uppercase mt-6 text-bone-muted">
                The Assembly Awaits
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
