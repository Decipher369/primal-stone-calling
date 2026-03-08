import { motion } from "framer-motion";
import petroglyphGathering from "@/assets/petroglyph-gathering.png";

const MissionSection = () => {
  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-fire text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            The Gathering of the 100
          </h2>
          <div className="section-divider w-48 mx-auto mt-4 mb-8" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <p className="text-carved text-lg md:text-xl leading-relaxed mb-6">
              From every corner of the land, 100 warriors answer the call. Not chosen by blood, but by fire — the fire to speak, to lead, to conquer.
            </p>
            <p className="text-carved text-lg md:text-xl leading-relaxed mb-6">
              This is not a competition. This is a <span className="text-fire font-bold">proving ground</span>. Each delegate will be forged through trials of voice and will, emerging as leaders of a new age.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              The tribe grows stronger with every voice that joins. Will yours echo through the ages?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex justify-center"
          >
            <div className="petroglyph-card p-6 max-w-xs">
              <img
                src={petroglyphGathering}
                alt="The Gathering - Ancient petroglyph depicting the assembly of 100"
                className="w-full opacity-80 mix-blend-screen"
              />
              <p className="text-center text-muted-foreground text-sm mt-4 font-heading uppercase tracking-wider">
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
