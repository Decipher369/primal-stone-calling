import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative py-24 md:py-40 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display text-fire text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Answer the Call
          </h2>
          <div className="section-divider w-48 mx-auto mb-8" />
          <p className="text-carved text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto">
            The stones have spoken. The fire awaits your mark. Join the tribe — carve your name into history.
          </p>

          <motion.button
            className="btn-brand text-lg md:text-xl rounded-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            ⚡ Join the Tribe
          </motion.button>

          <p className="text-muted-foreground text-sm mt-8 tracking-wider uppercase font-heading">
            Limited to 100 warriors
          </p>
        </motion.div>

        {/* Decorative embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                backgroundColor: `hsl(${20 + Math.random() * 20}, 90%, ${50 + Math.random() * 30}%)`,
                left: `${10 + Math.random() * 80}%`,
                bottom: 0,
                boxShadow: `0 0 4px hsl(24, 85%, 50%)`,
              }}
              animate={{ y: [-20, -150 - Math.random() * 200], opacity: [0.6, 0] }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
