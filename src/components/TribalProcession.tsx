import { motion } from "framer-motion";

/**
 * Animated prehistoric procession — silhouetted tribal figures, mammoths,
 * and sabretooth tigers walking across the bottom of a section.
 * Infinite horizontal scroll, mirrored for seamless loop.
 */

// SVG path data for each silhouette figure
const figures = {
  // Tall warrior with spear
  warrior1: (
    <g>
      <circle cx="15" cy="6" r="5" />
      <path d="M15 11 L15 30 M8 18 L22 18 M15 30 L8 45 M15 30 L22 45" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      <line x1="22" y1="18" x2="26" y2="2" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" />
    </g>
  ),
  // Walking person with bundle
  gatherer: (
    <g>
      <circle cx="14" cy="6" r="5" />
      <path d="M14 11 L14 28 M7 19 L14 16 L21 20 M14 28 L8 44 M14 28 L20 44" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="17" rx="4" ry="3" fill="currentColor" opacity="0.7" />
    </g>
  ),
  // Person with raised arm
  shaman: (
    <g>
      <circle cx="15" cy="6" r="5" />
      <path d="M15 11 L15 30 M8 22 L15 17 M15 17 L20 10 M15 30 L9 45 M15 30 L21 45" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Mammoth - large body, trunk, tusks
  mammoth: (
    <g>
      <ellipse cx="35" cy="25" rx="22" ry="15" fill="currentColor" />
      <ellipse cx="35" cy="20" rx="18" ry="12" fill="currentColor" />
      {/* Hump */}
      <ellipse cx="28" cy="12" rx="10" ry="8" fill="currentColor" />
      {/* Head */}
      <ellipse cx="55" cy="18" rx="8" ry="9" fill="currentColor" />
      {/* Trunk */}
      <path d="M62 22 Q68 30 65 40 Q63 44 60 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Tusks */}
      <path d="M58 26 Q64 28 62 34 Q60 38 56 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <rect x="20" y="35" width="5" height="14" rx="2" fill="currentColor" />
      <rect x="30" y="35" width="5" height="14" rx="2" fill="currentColor" />
      <rect x="40" y="35" width="5" height="14" rx="2" fill="currentColor" />
      <rect x="48" y="35" width="5" height="14" rx="2" fill="currentColor" />
      {/* Tail */}
      <path d="M13 18 Q6 14 8 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="58" cy="16" r="1.5" fill="hsl(25, 30%, 6%)" />
    </g>
  ),
  // Sabretooth tiger - sleek predator
  sabretooth: (
    <g>
      <ellipse cx="25" cy="22" rx="16" ry="9" fill="currentColor" />
      {/* Head */}
      <ellipse cx="40" cy="18" rx="7" ry="6" fill="currentColor" />
      {/* Ears */}
      <path d="M37 13 L35 8 L38 12" fill="currentColor" />
      <path d="M42 13 L44 8 L41 12" fill="currentColor" />
      {/* Fangs */}
      <line x1="38" y1="23" x2="37" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="43" y1="23" x2="44" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Legs */}
      <rect x="13" y="28" width="3.5" height="12" rx="1.5" fill="currentColor" />
      <rect x="20" y="28" width="3.5" height="12" rx="1.5" fill="currentColor" />
      <rect x="30" y="28" width="3.5" height="12" rx="1.5" fill="currentColor" />
      <rect x="36" y="28" width="3.5" height="12" rx="1.5" fill="currentColor" />
      {/* Tail */}
      <path d="M9 20 Q2 12 6 8 Q8 6 10 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="43" cy="17" r="1.2" fill="hsl(25, 30%, 6%)" />
    </g>
  ),
  // Child walking
  child: (
    <g>
      <circle cx="10" cy="8" r="4" />
      <path d="M10 12 L10 24 M5 17 L15 17 M10 24 L6 35 M10 24 L14 35" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Warrior with shield
  shieldWarrior: (
    <g>
      <circle cx="15" cy="6" r="5" />
      <path d="M15 11 L15 30 M9 19 L15 16 M15 30 L9 45 M15 30 L21 45" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Shield */}
      <ellipse cx="22" cy="22" rx="5" ry="7" fill="currentColor" opacity="0.8" />
      <line x1="22" y1="15" x2="22" y2="29" stroke="hsl(25, 30%, 6%)" strokeWidth="1" />
    </g>
  ),
  // Person with bird
  birdKeeper: (
    <g>
      <circle cx="14" cy="6" r="5" />
      <path d="M14 11 L14 30 M7 19 L14 16 L21 12 M14 30 L8 45 M14 30 L20 45" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Bird on arm */}
      <ellipse cx="23" cy="10" rx="3" ry="2" fill="currentColor" />
      <path d="M26 10 L29 9 M26 10 L29 11" stroke="currentColor" strokeWidth="1" />
      <circle cx="25" cy="9.5" r="0.8" fill="hsl(25, 30%, 6%)" />
    </g>
  ),
};

// The sequence of figures in one procession cycle
const processionSequence = [
  { key: "w1", figure: figures.warrior1, width: 30, height: 48, yOffset: 2 },
  { key: "g1", figure: figures.gatherer, width: 28, height: 48, yOffset: 2 },
  { key: "c1", figure: figures.child, width: 20, height: 38, yOffset: 12 },
  { key: "m1", figure: figures.mammoth, width: 70, height: 52, yOffset: 0 },
  { key: "s1", figure: figures.shaman, width: 30, height: 48, yOffset: 2 },
  { key: "bk", figure: figures.birdKeeper, width: 32, height: 48, yOffset: 2 },
  { key: "st1", figure: figures.sabretooth, width: 50, height: 42, yOffset: 8 },
  { key: "sw1", figure: figures.shieldWarrior, width: 28, height: 48, yOffset: 2 },
  { key: "w2", figure: figures.warrior1, width: 30, height: 48, yOffset: 2 },
  { key: "c2", figure: figures.child, width: 20, height: 38, yOffset: 12 },
  { key: "g2", figure: figures.gatherer, width: 28, height: 48, yOffset: 2 },
  { key: "m2", figure: figures.mammoth, width: 70, height: 52, yOffset: 0 },
  { key: "s2", figure: figures.shaman, width: 30, height: 48, yOffset: 2 },
  { key: "st2", figure: figures.sabretooth, width: 50, height: 42, yOffset: 8 },
  { key: "sw2", figure: figures.shieldWarrior, width: 28, height: 48, yOffset: 2 },
  { key: "bk2", figure: figures.birdKeeper, width: 32, height: 48, yOffset: 2 },
];

const TribalProcession = () => {
  // Render the sequence twice for seamless loop
  const renderSequence = (keyPrefix: string) => (
    <div className="flex items-end gap-8 md:gap-12 shrink-0 pr-8 md:pr-12">
      {processionSequence.map((item) => (
        <svg
          key={`${keyPrefix}-${item.key}`}
          width={item.width}
          height={item.height}
          viewBox={`0 0 ${item.width} ${item.height}`}
          className="shrink-0"
          style={{
            color: "hsl(var(--bone) / 0.18)",
            marginBottom: item.yOffset ? `-${item.yOffset}px` : undefined,
          }}
          fill="currentColor"
        >
          {item.figure}
        </svg>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Tribal border pattern top */}
      <div
        className="w-full h-px mb-4"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--bone) / 0.12), transparent)" }}
      />

      {/* Scrolling procession */}
      <motion.div
        className="flex items-end"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {renderSequence("a")}
        {renderSequence("b")}
      </motion.div>

      {/* Tribal border pattern bottom — zigzag */}
      <div className="w-full mt-4 flex justify-center">
        <svg width="100%" height="8" viewBox="0 0 800 8" preserveAspectRatio="none" className="opacity-15">
          <path
            d="M0 4 L10 0 L20 4 L30 0 L40 4 L50 0 L60 4 L70 0 L80 4 L90 0 L100 4 L110 0 L120 4 L130 0 L140 4 L150 0 L160 4 L170 0 L180 4 L190 0 L200 4 L210 0 L220 4 L230 0 L240 4 L250 0 L260 4 L270 0 L280 4 L290 0 L300 4 L310 0 L320 4 L330 0 L340 4 L350 0 L360 4 L370 0 L380 4 L390 0 L400 4 L410 0 L420 4 L430 0 L440 4 L450 0 L460 4 L470 0 L480 4 L490 0 L500 4 L510 0 L520 4 L530 0 L540 4 L550 0 L560 4 L570 0 L580 4 L590 0 L600 4 L610 0 L620 4 L630 0 L640 4 L650 0 L660 4 L670 0 L680 4 L690 0 L700 4 L710 0 L720 4 L730 0 L740 4 L750 0 L760 4 L770 0 L780 4 L790 0 L800 4"
            stroke="hsl(var(--bone))"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default TribalProcession;
