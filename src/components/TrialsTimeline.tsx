import { motion } from "framer-motion";
import petroglyphSpeaking from "@/assets/petroglyph-speaking.png";
import petroglyphVirtual from "@/assets/petroglyph-virtual.png";
import petroglyphBattle from "@/assets/petroglyph-battle.png";

const trials = [
  {
    number: "I",
    title: "The Voice Trial",
    subtitle: "Speaking Workshop",
    description: "Master the ancient art of commanding a room. In these sacred grounds, your voice becomes your weapon — sharp, resonant, unstoppable.",
    image: petroglyphSpeaking,
    alt: "Petroglyph of an orator addressing the tribe",
  },
  {
    number: "II",
    title: "The Spirit Walk",
    subtitle: "Virtual Rounds",
    description: "Across unseen pathways, warriors clash in virtual arenas. No walls can contain the power of a mind sharpened for battle.",
    image: petroglyphVirtual,
    alt: "Petroglyph of mystic communication circle",
  },
  {
    number: "III",
    title: "The Grand Siege",
    subtitle: "Military-Themed Finale",
    description: "The final trial. A military gauntlet where only the strongest voices survive. This is where legends are carved into stone forever.",
    image: petroglyphBattle,
    alt: "Petroglyph of warriors in battle formation",
  },
];

const TrialsTimeline = () => {
  return (
    <section id="trials" className="relative py-28 md:py-40 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-6">The Journey</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] text-carved">
            The Trials
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {trials.map((trial, index) => (
            <motion.div
              key={trial.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                index % 2 !== 0 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Text */}
              <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-display text-5xl md:text-7xl font-bold text-fire opacity-30">{trial.number}</span>
                  <div>
                    <p className="font-heading text-xs tracking-[0.4em] uppercase text-fire mb-1">{trial.subtitle}</p>
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-carved">{trial.title}</h3>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-body leading-relaxed text-bone-muted mt-6">
                  {trial.description}
                </p>
              </div>

              {/* Image */}
              <div className={`flex ${index % 2 !== 0 ? "md:order-1 md:justify-start" : "md:justify-end"} justify-center`}>
                <div className="petroglyph-card p-6 w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                  <img
                    src={trial.image}
                    alt={trial.alt}
                    className="w-full h-full object-contain opacity-65 mix-blend-screen"
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
