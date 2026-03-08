import { motion } from "framer-motion";

/**
 * Animated prehistoric procession — highly detailed cave-painting style
 * silhouetted tribal figures, mammoths, and sabretooth tigers walking
 * across. Realistic filled-shape silhouettes inspired by Lascaux / 
 * Bhimbetka cave paintings.
 */

// All figures are detailed filled SVG paths — cave art silhouette style
const Mammoth = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="currentColor" className="shrink-0">
    {/* Main body */}
    <path d="M20 42 Q15 30 22 20 Q28 12 40 10 Q50 8 60 10 Q72 12 80 18 Q88 24 90 34 Q92 42 88 50 L88 52 Q90 50 94 44 Q96 40 98 38 Q100 36 102 38 Q104 40 102 46 Q100 52 96 56 Q94 58 92 56 L88 52 L88 70 Q88 74 86 74 L84 74 Q82 74 82 70 L82 56 L72 56 L72 72 Q72 76 70 76 L68 76 Q66 76 66 72 L66 56 L48 56 L48 72 Q48 76 46 76 L44 76 Q42 76 42 72 L42 56 L32 56 L32 70 Q32 74 30 74 L28 74 Q26 74 26 70 L26 52 Q22 50 20 46 Q18 44 20 42Z" />
    {/* Head bump / dome */}
    <path d="M30 20 Q34 4 48 6 Q54 7 52 14 Q50 18 44 18 Q36 18 30 20Z" />
    {/* Trunk */}
    <path d="M92 38 Q96 36 100 38 Q106 42 108 50 Q110 58 106 64 Q104 68 100 70 Q98 72 96 70 Q94 68 96 66 Q100 62 102 56 Q104 50 100 44 Q98 40 94 40Z" />
    {/* Tusks */}
    <path d="M90 40 Q96 44 100 52 Q104 60 100 66 Q98 68 96 66 Q94 62 96 56 Q98 50 94 44 L90 40Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Small tusk */}
    <path d="M88 42 Q92 46 94 52 Q96 58 92 62" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Ear */}
    <path d="M80 22 Q84 18 88 22 Q90 26 86 30 Q82 32 80 28 Z" />
    {/* Eye */}
    <circle cx="86" cy="26" r="2" fill="hsl(var(--cave-deep))" />
    {/* Tail */}
    <path d="M20 42 Q14 38 10 32 Q8 28 10 26 Q12 24 14 28 Q16 34 20 38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Fur texture lines */}
    <path d="M35 16 Q38 14 40 16 M44 12 Q46 10 48 12 M55 14 Q57 12 60 14 M65 16 Q68 14 70 18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Belly fur */}
    <path d="M36 52 Q38 56 40 52 Q42 56 44 52 Q46 56 48 52 Q50 56 52 52 Q54 56 56 52 Q58 56 60 52 Q62 56 64 52" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

const SabretoothTiger = () => (
  <svg width="80" height="55" viewBox="0 0 80 55" fill="currentColor" className="shrink-0">
    {/* Body */}
    <path d="M12 24 Q8 18 14 14 Q20 10 30 10 Q42 10 52 12 Q58 14 62 18 Q66 22 66 28 Q66 34 62 36 L62 44 Q62 48 60 48 L58 48 Q56 48 56 44 L56 36 L48 36 L48 44 Q48 48 46 48 L44 48 Q42 48 42 44 L42 36 L30 36 L30 44 Q30 48 28 48 L26 48 Q24 48 24 44 L24 36 L18 36 L18 44 Q18 48 16 48 L14 48 Q12 48 12 44 L12 34 Q8 30 10 26 Z" />
    {/* Head */}
    <path d="M62 18 Q66 14 72 14 Q78 14 78 20 Q78 26 74 30 Q70 34 66 32 Q62 30 62 26 Z" />
    {/* Ears */}
    <path d="M68 14 Q66 8 68 6 Q70 4 72 8 Q73 12 70 14Z" />
    <path d="M74 14 Q74 8 76 6 Q78 4 78 10 Q78 14 76 14Z" />
    {/* Fangs — the iconic sabretooth canines */}
    <path d="M70 28 Q69 32 68 38 Q67 42 68 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M74 28 Q75 32 76 38 Q77 42 76 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="72" cy="20" r="1.5" fill="hsl(var(--cave-deep))" />
    {/* Nose */}
    <circle cx="77" cy="22" r="1" fill="hsl(var(--cave-deep))" />
    {/* Tail — long and curved up */}
    <path d="M12 24 Q6 20 4 14 Q2 8 6 4 Q8 2 10 6 Q12 12 12 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Stripes */}
    <path d="M28 14 Q30 10 32 14 M36 12 Q38 8 40 12 M44 14 Q46 10 48 14 M52 16 Q54 12 56 16" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="1" opacity="0.15" />
    {/* Muscular definition */}
    <path d="M24 20 Q30 16 36 20 Q42 16 48 20" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.8" opacity="0.1" />
  </svg>
);

const WarriorWithSpear = () => (
  <svg width="40" height="80" viewBox="0 0 40 80" fill="currentColor" className="shrink-0">
    {/* Head */}
    <ellipse cx="18" cy="8" rx="6" ry="7" />
    {/* Hair/headdress */}
    <path d="M12 6 Q10 2 14 0 Q18 -2 22 0 Q26 2 24 6 Q22 4 18 3 Q14 4 12 6Z" />
    {/* Torso */}
    <path d="M12 14 Q10 16 10 22 Q10 30 12 36 L24 36 Q26 30 26 22 Q26 16 24 14 Z" />
    {/* Cloth/loincloth */}
    <path d="M10 34 Q8 38 10 42 L14 42 Q12 38 14 34 Z" />
    <path d="M26 34 Q28 38 26 42 L22 42 Q24 38 22 34 Z" />
    {/* Left arm forward */}
    <path d="M12 16 Q6 20 4 26 Q2 30 4 32 Q6 30 6 26 Q8 22 12 18Z" />
    {/* Right arm holding spear high */}
    <path d="M24 16 Q28 14 30 10 Q32 6 34 4 Q36 2 36 4 Q34 8 32 12 Q30 16 26 18Z" />
    {/* Spear */}
    <line x1="34" y1="0" x2="30" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    {/* Spear tip */}
    <path d="M33 0 L36 -4 L34 0 L32 -4 Z" />
    {/* Left leg — walking stride forward */}
    <path d="M14 36 Q10 44 8 52 Q6 60 8 68 Q10 72 12 72 Q14 72 14 68 Q14 60 14 52 Q14 46 14 36Z" />
    {/* Right leg — back stride */}
    <path d="M22 36 Q24 44 26 52 Q28 60 30 66 Q32 70 30 72 Q28 72 26 68 Q24 60 22 52 Q20 46 22 36Z" />
    {/* Foot details */}
    <path d="M8 68 Q4 70 4 72 Q4 74 10 74 Q14 74 14 72 L14 68" />
    <path d="M26 68 Q24 70 24 72 Q24 74 30 74 Q34 74 32 72 Q30 70 28 68" />
    {/* Necklace */}
    <path d="M14 14 Q18 18 22 14" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.8" opacity="0.3" />
  </svg>
);

const WomanWithBasket = () => (
  <svg width="36" height="76" viewBox="0 0 36 76" fill="currentColor" className="shrink-0">
    {/* Head */}
    <ellipse cx="16" cy="8" rx="5.5" ry="6.5" />
    {/* Long hair */}
    <path d="M10 6 Q8 12 8 18 Q8 22 10 22 Q10 16 12 10 Z" />
    <path d="M22 6 Q24 12 24 18 Q24 22 22 22 Q22 16 20 10 Z" />
    {/* Torso — wrapped garment */}
    <path d="M10 14 Q8 18 8 26 Q8 34 10 38 L22 38 Q24 34 24 26 Q24 18 22 14 Z" />
    {/* Garment pattern — diagonal wrap lines */}
    <path d="M10 18 Q14 22 22 20 M10 24 Q14 28 22 26 M10 30 Q14 34 22 32" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.7" opacity="0.2" />
    {/* Skirt */}
    <path d="M8 36 Q6 46 8 56 Q10 60 14 60 L14 38 Z" />
    <path d="M24 36 Q26 46 24 56 Q22 60 18 60 L18 38 Z" />
    {/* Dots on garment — tribal decoration */}
    <circle cx="14" cy="20" r="0.8" fill="hsl(var(--cave-deep))" opacity="0.25" />
    <circle cx="18" cy="24" r="0.8" fill="hsl(var(--cave-deep))" opacity="0.25" />
    <circle cx="14" cy="28" r="0.8" fill="hsl(var(--cave-deep))" opacity="0.25" />
    {/* Arms */}
    <path d="M10 16 Q4 22 4 28 Q4 30 6 28 Q6 24 10 18 Z" />
    <path d="M22 16 Q26 20 28 16 Q30 12 28 10 Q26 12 24 16 Z" />
    {/* Basket on head */}
    <path d="M10 2 Q8 -2 10 -4 Q14 -6 20 -6 Q24 -4 24 -2 Q26 2 22 4 Q18 2 14 4 Q12 2 10 2Z" />
    {/* Basket hatching */}
    <path d="M12 -2 L20 -2 M11 0 L21 0" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.6" opacity="0.3" />
    {/* Legs */}
    <path d="M10 56 Q10 62 10 68 Q10 72 14 72 Q16 72 14 68 L14 60 Z" />
    <path d="M20 56 Q22 62 24 68 Q26 72 22 72 Q20 72 20 68 L20 60 Z" />
    {/* Feet */}
    <path d="M10 68 Q6 72 8 74 Q12 76 16 74 L14 68" />
    <path d="M20 68 Q18 72 20 74 Q24 76 28 74 Q26 72 24 68" />
  </svg>
);

const ChildWithDog = () => (
  <svg width="44" height="52" viewBox="0 0 44 52" fill="currentColor" className="shrink-0">
    {/* Child head */}
    <ellipse cx="12" cy="6" rx="5" ry="5.5" />
    {/* Child body */}
    <path d="M8 11 Q6 15 6 22 Q6 26 8 28 L16 28 Q18 26 18 22 Q18 15 16 11 Z" />
    {/* Child arms */}
    <path d="M8 14 Q4 18 2 22 Q0 24 2 24 Q4 22 6 18 Z" />
    <path d="M16 14 Q20 18 24 20 Q26 20 24 18 Q20 14 18 12 Z" />
    {/* Child legs */}
    <path d="M8 28 Q6 34 6 40 Q6 44 10 44 Q12 44 10 40 L10 30 Z" />
    <path d="M14 28 Q16 34 18 40 Q20 44 16 44 Q14 44 14 40 L14 30 Z" />
    {/* Child feet */}
    <path d="M6 40 Q2 44 6 46 Q10 46 10 44" />
    <path d="M14 40 Q12 44 14 46 Q18 48 20 44 Q18 42 16 40" />
    {/* Dog — small primitive wolf/dog */}
    <ellipse cx="34" cy="32" rx="8" ry="5" />
    <ellipse cx="42" cy="28" rx="4" ry="3.5" />
    {/* Dog ears */}
    <path d="M40 25 Q38 22 40 22 Q42 22 42 25Z" />
    <path d="M44 25 Q44 22 46 22 Q48 24 46 26Z" />
    {/* Dog legs */}
    <rect x="28" y="35" width="2.5" height="8" rx="1" />
    <rect x="32" y="35" width="2.5" height="8" rx="1" />
    <rect x="36" y="35" width="2.5" height="8" rx="1" />
    <rect x="40" y="35" width="2.5" height="8" rx="1" />
    {/* Dog tail */}
    <path d="M26 30 Q22 26 24 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Dog eye */}
    <circle cx="44" cy="27" r="1" fill="hsl(var(--cave-deep))" />
    {/* Dog nose */}
    <circle cx="46" cy="29" r="0.8" fill="hsl(var(--cave-deep))" />
    {/* Leash/bond line */}
    <path d="M24 20 Q28 24 30 28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2" />
  </svg>
);

const ElderWithStaff = () => (
  <svg width="38" height="78" viewBox="0 0 38 78" fill="currentColor" className="shrink-0">
    {/* Head */}
    <ellipse cx="16" cy="8" rx="6" ry="7" />
    {/* Beard */}
    <path d="M12 12 Q10 18 12 22 Q14 24 18 24 Q20 22 22 18 Q24 12 20 12 Q18 16 16 18 Q14 16 12 12Z" opacity="0.7" />
    {/* Body — hunched slightly */}
    <path d="M10 18 Q8 22 8 30 Q8 38 10 42 L22 42 Q24 38 24 30 Q24 22 22 18 Z" />
    {/* Cloak/furs */}
    <path d="M8 20 Q4 24 4 32 Q4 40 8 42 L10 42 Q8 38 8 30 Q8 24 10 20 Z" opacity="0.8" />
    {/* Arms */}
    <path d="M8 22 Q4 26 2 32 Q0 36 2 36 Q4 34 6 28 Z" />
    <path d="M22 20 Q26 18 30 16 Q32 14 32 16 Q30 20 26 22 Z" />
    {/* Walking staff */}
    <line x1="32" y1="4" x2="28" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Staff top — carved hook */}
    <path d="M32 4 Q34 0 36 2 Q38 4 36 6 Q34 8 32 6" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Skirt/lower garment */}
    <path d="M8 40 Q6 50 8 58 L14 58 Q12 50 14 40 Z" />
    <path d="M22 40 Q24 50 22 58 L18 58 Q20 50 18 40 Z" />
    {/* Legs — slower gait */}
    <path d="M10 58 Q8 62 8 68 Q8 72 12 72 Q14 72 12 68 L12 60 Z" />
    <path d="M20 58 Q22 62 22 68 Q22 72 18 72 Q16 72 18 68 L18 60 Z" />
    {/* Feet */}
    <path d="M8 68 Q4 72 6 74 Q10 76 14 74 L12 68" />
    <path d="M18 68 Q16 72 18 74 Q22 76 24 72 L22 68" />
    {/* Amulet */}
    <circle cx="16" cy="24" r="2" fill="hsl(var(--cave-deep))" opacity="0.2" />
  </svg>
);

const HunterCrouching = () => (
  <svg width="42" height="58" viewBox="0 0 42 58" fill="currentColor" className="shrink-0">
    {/* Head — leaning forward */}
    <ellipse cx="28" cy="8" rx="5.5" ry="6" />
    {/* Torso — bent forward */}
    <path d="M14 20 Q16 14 22 12 Q28 12 30 14 Q32 18 30 26 Q28 30 24 32 L16 30 Q12 28 12 24 Z" />
    {/* Arm forward with bow */}
    <path d="M30 14 Q34 12 38 14 Q40 16 38 18 Q36 16 32 16 Z" />
    {/* Bow */}
    <path d="M38 6 Q42 14 38 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Bowstring */}
    <line x1="38" y1="6" x2="38" y2="24" stroke="currentColor" strokeWidth="0.8" />
    {/* Arrow */}
    <line x1="30" y1="14" x2="42" y2="14" stroke="currentColor" strokeWidth="1" />
    <path d="M42 14 L40 12 M42 14 L40 16" stroke="currentColor" strokeWidth="0.8" />
    {/* Back arm */}
    <path d="M16 18 Q12 22 10 26 Q8 28 10 28 Q12 26 14 22 Z" />
    {/* Quiver on back */}
    <path d="M18 12 Q16 8 18 4 Q20 2 22 4 Q24 8 22 14 Z" opacity="0.7" />
    {/* Arrow feathers in quiver */}
    <line x1="19" y1="4" x2="19" y2="0" stroke="currentColor" strokeWidth="0.6" />
    <line x1="21" y1="3" x2="21" y2="-1" stroke="currentColor" strokeWidth="0.6" />
    {/* Legs — crouched */}
    <path d="M16 30 Q12 36 8 42 Q6 46 8 48 Q10 48 10 44 Q12 40 16 34 Z" />
    <path d="M22 30 Q20 38 18 44 Q16 48 18 50 Q20 50 20 46 Q22 40 24 34 Z" />
    {/* Feet */}
    <path d="M6 44 Q2 48 4 50 Q8 52 12 50 L10 44" />
    <path d="M16 46 Q14 50 16 52 Q20 54 22 50 L20 46" />
  </svg>
);

const WomanWalking = () => (
  <svg width="32" height="74" viewBox="0 0 32 74" fill="currentColor" className="shrink-0">
    {/* Head */}
    <ellipse cx="14" cy="8" rx="5.5" ry="6.5" />
    {/* Hair bun */}
    <path d="M8 4 Q6 0 10 -2 Q14 -4 18 -2 Q22 0 20 4 Q18 2 14 2 Q10 2 8 4Z" />
    {/* Neck */}
    <rect x="12" y="14" width="4" height="3" rx="1" />
    {/* Draped garment */}
    <path d="M8 16 Q4 20 6 30 Q8 38 10 42 L20 42 Q22 38 24 30 Q26 20 22 16 Z" />
    {/* Garment drape lines */}
    <path d="M10 20 Q14 24 20 22 M8 28 Q14 32 22 28 M10 34 Q14 38 20 36" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.6" opacity="0.15" />
    {/* Wrap sash */}
    <path d="M6 24 Q4 28 6 32 L10 30 Q8 26 10 22 Z" opacity="0.7" />
    {/* Arms */}
    <path d="M8 18 Q4 22 2 28 Q0 32 2 32 Q4 30 4 26 Q6 22 8 20Z" />
    <path d="M22 18 Q26 22 28 18 Q30 14 28 14 Q26 16 24 20Z" />
    {/* Skirt */}
    <path d="M8 40 Q4 50 6 60 Q8 62 12 62 L12 42 Z" />
    <path d="M22 40 Q26 50 24 60 Q22 62 18 62 L18 42 Z" />
    {/* Legs */}
    <path d="M8 60 Q8 64 8 68 Q8 70 12 70 L12 62 Z" />
    <path d="M20 60 Q22 64 24 68 Q24 70 20 70 L18 62 Z" />
    {/* Feet */}
    <path d="M8 68 Q4 70 6 72 Q10 74 14 72 L12 68" />
    <path d="M20 68 Q18 72 20 74 Q24 74 26 72 Q24 70 22 68" />
    {/* Bracelet */}
    <circle cx="2" cy="28" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

const DrummerWalking = () => (
  <svg width="38" height="76" viewBox="0 0 38 76" fill="currentColor" className="shrink-0">
    {/* Head */}
    <ellipse cx="16" cy="8" rx="5.5" ry="6.5" />
    {/* Feather headdress */}
    <path d="M10 4 Q8 -2 12 -4 Q14 -4 14 0 Z" opacity="0.7" />
    <path d="M14 2 Q14 -4 18 -6 Q20 -6 18 0 Z" opacity="0.7" />
    <path d="M18 4 Q20 -2 24 -2 Q26 0 22 4 Z" opacity="0.7" />
    {/* Torso */}
    <path d="M10 14 Q8 18 8 26 Q8 32 10 36 L22 36 Q24 32 24 26 Q24 18 22 14 Z" />
    {/* Drum — hanging at waist */}
    <ellipse cx="28" cy="28" rx="6" ry="8" />
    <ellipse cx="28" cy="28" rx="6" ry="8" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.5" opacity="0.2" />
    <path d="M22 28 L28 20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {/* Drum strap */}
    <path d="M18 14 Q22 16 26 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Arms — one hitting drum */}
    <path d="M10 16 Q4 22 4 28 Q4 30 6 28 Q6 24 10 18Z" />
    <path d="M22 18 Q26 22 30 24 Q32 24 30 22 Q26 18 24 16Z" />
    {/* Drumstick */}
    <line x1="30" y1="22" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Legs */}
    <path d="M10 36 Q8 44 6 52 Q4 58 6 62 Q8 64 10 62 Q10 56 12 48 Q12 42 12 36Z" />
    <path d="M20 36 Q22 44 24 52 Q26 58 28 62 Q28 66 26 66 Q24 64 22 58 Q20 48 20 36Z" />
    {/* Feet */}
    <path d="M4 60 Q0 64 2 66 Q6 68 10 66 L10 60" />
    <path d="M24 62 Q22 66 24 68 Q28 70 30 66 L28 62" />
    {/* Body paint stripes */}
    <path d="M12 20 L20 20 M12 26 L20 26 M12 32 L20 32" fill="none" stroke="hsl(var(--cave-deep))" strokeWidth="0.8" opacity="0.15" />
  </svg>
);

// Each figure gets a bob speed, amplitude, and optional sway
type FigureEntry = {
  key: string;
  El: () => JSX.Element;
  h: number;
  bobDuration: number;  // seconds for one bob cycle
  bobAmount: number;    // pixels of vertical bob
  swayAmount?: number;  // degrees of rotation sway
  swayDuration?: number;
};

const processionSequence: FigureEntry[] = [
  { key: "w1", El: WarriorWithSpear, h: 80, bobDuration: 0.7, bobAmount: 3 },
  { key: "wm1", El: WomanWithBasket, h: 76, bobDuration: 0.8, bobAmount: 2.5 },
  { key: "cd1", El: ChildWithDog, h: 52, bobDuration: 0.55, bobAmount: 4 },
  { key: "mm1", El: Mammoth, h: 90, bobDuration: 1.2, bobAmount: 2, swayAmount: 1.5, swayDuration: 2.4 },
  { key: "el1", El: ElderWithStaff, h: 78, bobDuration: 1.0, bobAmount: 2 },
  { key: "dr1", El: DrummerWalking, h: 76, bobDuration: 0.6, bobAmount: 3.5 },
  { key: "st1", El: SabretoothTiger, h: 55, bobDuration: 0.5, bobAmount: 2, swayAmount: 1, swayDuration: 1.0 },
  { key: "ww1", El: WomanWalking, h: 74, bobDuration: 0.75, bobAmount: 2.5 },
  { key: "hc1", El: HunterCrouching, h: 58, bobDuration: 0.9, bobAmount: 1.5 },
  { key: "w2", El: WarriorWithSpear, h: 80, bobDuration: 0.7, bobAmount: 3 },
  { key: "mm2", El: Mammoth, h: 90, bobDuration: 1.2, bobAmount: 2, swayAmount: 1.5, swayDuration: 2.4 },
  { key: "wm2", El: WomanWithBasket, h: 76, bobDuration: 0.8, bobAmount: 2.5 },
  { key: "cd2", El: ChildWithDog, h: 52, bobDuration: 0.55, bobAmount: 4 },
  { key: "el2", El: ElderWithStaff, h: 78, bobDuration: 1.0, bobAmount: 2 },
  { key: "st2", El: SabretoothTiger, h: 55, bobDuration: 0.5, bobAmount: 2, swayAmount: 1, swayDuration: 1.0 },
  { key: "dr2", El: DrummerWalking, h: 76, bobDuration: 0.6, bobAmount: 3.5 },
  { key: "ww2", El: WomanWalking, h: 74, bobDuration: 0.75, bobAmount: 2.5 },
  { key: "hc2", El: HunterCrouching, h: 58, bobDuration: 0.9, bobAmount: 1.5 },
];

const maxH = 90;

const TribalProcession = () => {
  const renderSequence = (keyPrefix: string) => (
    <div className="flex items-end gap-6 md:gap-10 shrink-0 pr-6 md:pr-10">
      {processionSequence.map((item, i) => (
        <motion.div
          key={`${keyPrefix}-${item.key}`}
          className="shrink-0 flex items-end"
          style={{
            height: maxH,
            color: "hsl(var(--bone) / 0.22)",
            transformOrigin: "bottom center",
          }}
          animate={{
            y: [0, -item.bobAmount, 0],
            rotate: item.swayAmount
              ? [-item.swayAmount, item.swayAmount, -item.swayAmount]
              : [0, 0, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: item.bobDuration,
              ease: "easeInOut",
              delay: i * 0.12, // stagger so they don't all bob in sync
            },
            rotate: {
              repeat: Infinity,
              duration: item.swayDuration ?? item.bobDuration * 2,
              ease: "easeInOut",
              delay: i * 0.12,
            },
          }}
        >
          <item.El />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Top border — tribal diamond pattern */}
      <svg width="100%" height="12" viewBox="0 0 960 12" preserveAspectRatio="none" className="opacity-10 mb-4">
        <pattern id="diamond" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0 L24 6 L12 12 L0 6Z" fill="none" stroke="hsl(var(--bone))" strokeWidth="1" />
        </pattern>
        <rect width="960" height="12" fill="url(#diamond)" />
      </svg>

      {/* Scrolling procession */}
      <motion.div
        className="flex items-end"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {renderSequence("a")}
        {renderSequence("b")}
      </motion.div>

      {/* Ground line */}
      <div
        className="w-full h-px mt-2"
        style={{ background: "linear-gradient(90deg, transparent 2%, hsl(var(--bone) / 0.12) 20%, hsl(var(--bone) / 0.12) 80%, transparent 98%)" }}
      />

      {/* Bottom border — tribal zigzag + diamond */}
      <svg width="100%" height="16" viewBox="0 0 960 16" preserveAspectRatio="none" className="opacity-10 mt-2">
        <pattern id="zigzag" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L10 0 L20 8" fill="none" stroke="hsl(var(--bone))" strokeWidth="1.2" />
        </pattern>
        <rect y="0" width="960" height="8" fill="url(#zigzag)" />
        <pattern id="dots" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="4" r="1.5" fill="hsl(var(--bone))" />
        </pattern>
        <rect y="8" width="960" height="8" fill="url(#dots)" />
      </svg>
    </div>
  );
};

export default TribalProcession;
