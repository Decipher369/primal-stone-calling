import { motion } from "framer-motion";
import petroglyphSpeaking from "@/assets/petroglyph-speaking.png";
import petroglyphVirtual from "@/assets/petroglyph-virtual.png";
import petroglyphBattle from "@/assets/petroglyph-battle.png";

const trials = [
  {
    title: "The Voice Trial",
    subtitle: "Speaking Workshop",
    description: "Master the ancient art of commanding a room. In these sacred grounds, your voice becomes your weapon — sharp, resonant, unstoppable.",
    image: petroglyphSpeaking,
    alt: "Petroglyph of an orator addressing the tribe",
  },
  {
    title: "The Spirit Walk",
    subtitle: "Virtual Rounds",
    description: "Across unseen pathways, warriors clash in virtual arenas. No walls can contain the power of a mind sharpened for battle.",
    image: petroglyphVirtual,
    alt: "Petroglyph of mystic communication circle",
  },
  {
    title: "The Grand Siege",
    subtitle: "Military-Themed Grand Finale",
    description: "The final trial. A military gauntlet where only the strongest voices survive. This is where legends are carved into stone forever.",
    image: petroglyphBattle,
    alt: "Petroglyph of warriors in battle formation",
  },
];

const TrialsTimeline = () => {
  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-display text-fire text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            The Trials
          </h2>
          <div className="section-divider w-48 mx-auto mt-4" />
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--fire) / 0.3), hsl(var(--fire) / 0.5), hsl(var(--fire) / 0.3), transparent)" }}
          />

          {trials.map((trial, index) => (
            <motion.div
              key={trial.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-20 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10"
                style={{
                  backgroundColor: "hsl(var(--fire))",
                  boxShadow: "0 0 12px hsl(var(--fire) / 0.6), 0 0 30px hsl(var(--fire) / 0.3)",
                }}
              />

              {/* Content */}
              <div className={`flex-1 pl-14 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                <p className="text-fire font-heading text-sm uppercase tracking-[0.3em] mb-1">{trial.subtitle}</p>
                <h3 className="text-carved font-heading text-2xl md:text-3xl font-bold mb-3">{trial.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{trial.description}</p>
              </div>

              {/* Petroglyph */}
              <div className={`flex-1 pl-14 md:pl-0 flex ${index % 2 === 0 ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
                <div className="petroglyph-card p-4 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                  <img
                    src={trial.image}
                    alt={trial.alt}
                    className="w-full h-full object-contain opacity-75 mix-blend-screen"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrialsTimeline;
