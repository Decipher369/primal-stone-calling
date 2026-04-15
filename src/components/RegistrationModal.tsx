import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, Flame, ChevronRight, ChevronLeft, Sparkles, Users } from "lucide-react";
import stoneWallBg from "@/assets/stone-wall-bg.jpg";

/* ── tiny fire particle effect ───────────────────────────── */
const FireParticle = ({ delay = 0 }: { delay?: number }) => {
  const x = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 60;
  return (
    <motion.div
      className="absolute bottom-0 w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        background: `radial-gradient(circle, hsl(var(--ember)), hsl(var(--fire)))`,
      }}
      initial={{ y: 0, opacity: 0, scale: 1 }}
      animate={{
        y: [-10, -120],
        x: [0, drift],
        opacity: [0, 0.9, 0],
        scale: [1, 0.3],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "easeOut",
      }}
    />
  );
};

/* ── step config ──────────────────────────────────────────── */
const STEPS = [
  {
    key: "name",
    label: "Warrior Name",
    subtitle: "What do they call you?",
    icon: "🗡️",
    placeholder: "Your name",
    type: "text",
    rune: "ᚨ",
  },
  {
    key: "email",
    label: "Signal Fire",
    subtitle: "How do we reach you?",
    icon: "🔥",
    placeholder: "your@email.com",
    type: "email",
    rune: "ᚠ",
  },
  {
    key: "university",
    label: "Your Tribe",
    subtitle: "Which clan do you hail from?",
    icon: "🏛️",
    placeholder: "University / College name",
    type: "text",
    rune: "ᚷ",
  },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const POPULAR_UNIS = [
  "SLIIT",
  "University of Moratuwa",
  "University of Colombo",
  "University of Peradeniya",
  "NSBM Green University",
  "University of Kelaniya",
  "University of Sri Jayewardenepura",
  "IIT Sri Lanka",
  "NIBM",
  "University of Jaffna",
];

/* ── animation variants ──────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const tabletVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 80, rotateX: 15, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 60,
    rotateX: 5,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: "easeIn" as const },
  },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, filter: "blur(4px)" }),
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<Record<StepKey, string>>({
    name: "",
    email: "",
    university: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXCard = useTransform(mouseY, [-200, 200], [3, -3]);
  const rotateYCard = useTransform(mouseX, [-200, 200], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // auto-focus input on step change
  useEffect(() => {
    if (isOpen && !submitted) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [step, isOpen, submitted]);

  const validate = useCallback((key: StepKey, val: string): string | null => {
    const v = val.trim();
    if (!v) return "This field is required";
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email";
    if (key === "name" && v.length < 2) return "Name must be at least 2 characters";
    return null;
  }, []);

  const goNext = useCallback(() => {
    const currentStep = STEPS[step];
    const err = validate(currentStep.key, formData[currentStep.key]);
    if (err) {
      setErrors((prev) => ({ ...prev, [currentStep.key]: err }));
      return;
    }
    setErrors({});
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      // Submit!
      setSubmitted(true);
    }
  }, [step, formData, validate]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
      setErrors({});
    }
  }, [step]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); goNext(); }
  };

  const handleChange = (val: string) => {
    const key = STEPS[step].key;
    setFormData((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: "", email: "", university: "" });
      setErrors({});
      setSubmitted(false);
      setStep(0);
      setFocusedField(null);
      setDirection(1);
    }, 400);
  };

  const currentStep = STEPS[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Stone tablet modal */}
          <motion.div
            className="relative w-full max-w-md"
            variants={tabletVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              perspective: 1200,
              rotateX: rotateXCard,
              rotateY: rotateYCard,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative overflow-hidden"
              style={{
                backgroundImage: `url(${stoneWallBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: "hsl(var(--cave-deep) / 0.85)" }} />

              {/* Fire particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <FireParticle key={i} delay={i * 0.4} />
                ))}
              </div>

              {/* Animated carved edge */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: focusedField
                    ? "inset 0 0 80px hsl(var(--cave-deep) / 0.5), inset 0 2px 0 hsl(var(--bone) / 0.08), 0 0 100px hsl(24 80% 50% / 0.12)"
                    : "inset 0 0 60px hsl(var(--cave-deep) / 0.5), inset 0 2px 0 hsl(var(--bone) / 0.06), 0 0 80px hsl(0 0% 0% / 0.6)",
                }}
                transition={{ duration: 0.5 }}
                style={{ border: "2px solid hsl(var(--bone) / 0.15)" }}
              />

              {/* Corner runes */}
              {[
                { top: 3, left: 3, bt: true, bl: true },
                { top: 3, right: 3, bt: true, br: true },
                { bottom: 3, left: 3, bb: true, bl: true },
                { bottom: 3, right: 3, bb: true, br: true },
              ].map((corner, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-6 h-6"
                  style={{
                    top: corner.top !== undefined ? corner.top : undefined,
                    bottom: (corner as { bottom?: number }).bottom !== undefined ? (corner as { bottom?: number }).bottom : undefined,
                    left: corner.left !== undefined ? corner.left : undefined,
                    right: (corner as { right?: number }).right !== undefined ? (corner as { right?: number }).right : undefined,
                    borderTop: corner.bt ? "2px solid hsl(var(--fire))" : undefined,
                    borderBottom: corner.bb ? "2px solid hsl(var(--fire))" : undefined,
                    borderLeft: corner.bl ? "2px solid hsl(var(--fire))" : undefined,
                    borderRight: corner.br ? "2px solid hsl(var(--fire))" : undefined,
                  }}
                  animate={{
                    opacity: focusedField ? [0.3, 0.6, 0.3] : 0.2,
                    scale: focusedField ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                />
              ))}

              <div className="relative z-10 p-8 md:p-10">
                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 transition-colors"
                  style={{ color: "hsl(var(--bone-muted))" }}
                  aria-label="Close"
                  whileHover={{ color: "hsl(var(--fire))", scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <X size={20} />
                </motion.button>

                {!submitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="flex items-center justify-center gap-2 mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Users size={14} style={{ color: "hsl(var(--fire))" }} />
                        <span
                          className="font-heading text-[10px] tracking-[0.5em] uppercase"
                          style={{ color: "hsl(var(--fire))" }}
                        >
                          Pre-Signup
                        </span>
                        <Users size={14} style={{ color: "hsl(var(--fire))" }} />
                      </motion.div>
                      <motion.h3
                        className="text-display text-xl md:text-2xl font-bold text-carved tracking-[0.08em]"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        Claim Your Spot
                      </motion.h3>
                      <motion.p
                        className="font-body text-sm mt-2"
                        style={{ color: "hsl(var(--bone-muted))" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.6 }}
                      >
                        Be among the first to answer the call
                      </motion.p>
                    </div>

                    {/* ── Rune Step Indicators ── */}
                    <motion.div
                      className="flex items-center justify-center gap-3 mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {STEPS.map((s, i) => {
                        const isActive = i === step;
                        const isComplete = i < step || submitted;
                        return (
                          <div key={s.key} className="flex items-center gap-3">
                            <motion.div
                              className="relative flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                if (i < step) { setDirection(-1); setStep(i); }
                              }}
                              animate={{
                                scale: isActive ? 1.15 : 1,
                              }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              {/* Outer glow ring */}
                              <motion.div
                                className="absolute w-10 h-10 rounded-full"
                                style={{
                                  border: isActive
                                    ? "2px solid hsl(var(--fire) / 0.6)"
                                    : isComplete
                                      ? "2px solid hsl(var(--fire) / 0.3)"
                                      : "2px solid hsl(var(--bone) / 0.1)",
                                }}
                                animate={
                                  isActive
                                    ? {
                                        boxShadow: [
                                          "0 0 10px hsl(var(--fire) / 0.2)",
                                          "0 0 25px hsl(var(--fire) / 0.4)",
                                          "0 0 10px hsl(var(--fire) / 0.2)",
                                        ],
                                      }
                                    : { boxShadow: "0 0 0px transparent" }
                                }
                                transition={{ repeat: Infinity, duration: 2 }}
                              />
                              {/* Inner rune */}
                              <motion.span
                                className="relative z-10 w-10 h-10 flex items-center justify-center font-display text-lg"
                                style={{
                                  color: isActive
                                    ? "hsl(var(--fire))"
                                    : isComplete
                                      ? "hsl(var(--ember))"
                                      : "hsl(var(--bone) / 0.25)",
                                }}
                                animate={isComplete ? { rotate: [0, 360] } : {}}
                                transition={{ duration: 0.6 }}
                              >
                                {isComplete ? "✓" : s.rune}
                              </motion.span>
                            </motion.div>

                            {/* Connector line */}
                            {i < STEPS.length - 1 && (
                              <div className="w-6 h-px relative overflow-hidden">
                                <div
                                  className="absolute inset-0"
                                  style={{ background: "hsl(var(--bone) / 0.1)" }}
                                />
                                <motion.div
                                  className="absolute inset-0 origin-left"
                                  style={{
                                    background: "linear-gradient(90deg, hsl(var(--fire)), hsl(var(--ember)))",
                                  }}
                                  animate={{ scaleX: i < step ? 1 : 0 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>

                    {/* ── Step Content (animated slide) ── */}
                    <div className="relative min-h-[200px]">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={step}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          {/* Step icon + label */}
                          <div className="text-center mb-5">
                            <motion.span
                              className="text-3xl inline-block"
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                            >
                              {currentStep.icon}
                            </motion.span>
                            <p
                              className="font-heading text-xs tracking-[0.3em] uppercase mt-2"
                              style={{ color: "hsl(var(--bone-muted))" }}
                            >
                              {currentStep.subtitle}
                            </p>
                          </div>

                          {/* Input field */}
                          <motion.div
                            className="relative group"
                            animate={{ scale: focusedField === currentStep.key ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {/* Glow underline */}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-[2px]"
                              style={{
                                background: "linear-gradient(90deg, transparent, hsl(var(--fire)), transparent)",
                              }}
                              animate={{
                                opacity: focusedField === currentStep.key ? 1 : 0,
                                scaleX: focusedField === currentStep.key ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            />

                            <input
                              ref={inputRef}
                              type={currentStep.type}
                              value={formData[currentStep.key]}
                              onChange={(e) => handleChange(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder={currentStep.placeholder}
                              maxLength={currentStep.type === "email" ? 255 : 200}
                              className="w-full px-5 py-4 font-body text-lg outline-none transition-all duration-300 placeholder:opacity-25 text-center"
                              style={{
                                background:
                                  focusedField === currentStep.key
                                    ? "hsl(var(--cave-mid) / 0.7)"
                                    : "hsl(var(--cave-mid) / 0.5)",
                                border:
                                  errors[currentStep.key]
                                    ? "1px solid hsl(var(--fire))"
                                    : focusedField === currentStep.key
                                      ? "1px solid hsl(var(--fire) / 0.5)"
                                      : "1px solid hsl(var(--border))",
                                color: "hsl(var(--bone))",
                                boxShadow:
                                  focusedField === currentStep.key
                                    ? "var(--shadow-carved), 0 0 20px hsl(var(--fire) / 0.08)"
                                    : "var(--shadow-carved)",
                              }}
                              onFocus={() => setFocusedField(currentStep.key)}
                              onBlur={() => setFocusedField(null)}
                              autoComplete={currentStep.type === "email" ? "email" : "off"}
                            />
                          </motion.div>

                          {/* Error */}
                          <AnimatePresence>
                            {errors[currentStep.key] && (
                              <motion.p
                                className="text-xs mt-2 font-body text-center flex items-center justify-center gap-1"
                                style={{ color: "hsl(var(--fire))" }}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                              >
                                <motion.span
                                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                                  transition={{ duration: 0.5 }}
                                >
                                  ⚠
                                </motion.span>
                                {errors[currentStep.key]}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          {/* University quick-picks */}
                          {currentStep.key === "university" && (
                            <motion.div
                              className="mt-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <p
                                className="font-heading text-[10px] tracking-[0.3em] uppercase text-center mb-3"
                                style={{ color: "hsl(var(--bone-muted) / 0.5)" }}
                              >
                                Popular Tribes
                              </p>
                              <div className="flex flex-wrap justify-center gap-1.5">
                                {POPULAR_UNIS.map((uni, i) => {
                                  const isSelected = formData.university === uni;
                                  return (
                                    <motion.button
                                      key={uni}
                                      type="button"
                                      onClick={() => {
                                        setFormData((prev) => ({ ...prev, university: uni }));
                                        if (errors.university) setErrors((prev) => ({ ...prev, university: "" }));
                                      }}
                                      className="px-3 py-1.5 font-body text-[11px] transition-all duration-200 cursor-pointer"
                                      style={{
                                        background: isSelected
                                          ? "hsl(var(--fire) / 0.2)"
                                          : "hsl(var(--cave-mid) / 0.4)",
                                        border: isSelected
                                          ? "1px solid hsl(var(--fire) / 0.5)"
                                          : "1px solid hsl(var(--border) / 0.5)",
                                        color: isSelected
                                          ? "hsl(var(--bone))"
                                          : "hsl(var(--bone-muted))",
                                      }}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.1 + i * 0.03 }}
                                      whileHover={{
                                        scale: 1.05,
                                        borderColor: "hsl(var(--fire) / 0.4)",
                                      }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {uni}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* ── Navigation buttons ── */}
                    <div className="flex items-center justify-between mt-8 gap-4">
                      {/* Back button */}
                      <motion.button
                        onClick={goBack}
                        className="flex items-center gap-1 font-heading text-xs tracking-[0.2em] uppercase py-3 px-5 transition-colors"
                        style={{
                          color: step > 0 ? "hsl(var(--bone-muted))" : "transparent",
                          border: step > 0 ? "1px solid hsl(var(--border))" : "1px solid transparent",
                          pointerEvents: step > 0 ? "auto" : "none",
                        }}
                        whileHover={step > 0 ? { color: "hsl(var(--bone))", borderColor: "hsl(var(--bone) / 0.3)" } : {}}
                        whileTap={step > 0 ? { scale: 0.96 } : {}}
                      >
                        <ChevronLeft size={14} />
                        Back
                      </motion.button>

                      {/* Next / Submit button */}
                      <motion.button
                        onClick={goNext}
                        className="relative flex items-center gap-2 font-heading text-xs tracking-[0.25em] uppercase py-3 px-8 overflow-hidden group"
                        style={{
                          background: step === STEPS.length - 1 ? "hsl(var(--fire))" : "transparent",
                          color:
                            step === STEPS.length - 1
                              ? "hsl(var(--cave-deep))"
                              : "hsl(var(--bone))",
                          border:
                            step === STEPS.length - 1
                              ? "1px solid hsl(var(--fire))"
                              : "1px solid hsl(var(--bone) / 0.4)",
                        }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow:
                            step === STEPS.length - 1
                              ? "0 0 40px hsla(24, 80%, 50%, 0.5), 0 0 80px hsla(24, 80%, 50%, 0.2)"
                              : "0 0 25px hsl(var(--fire) / 0.15)",
                          borderColor: "hsl(var(--fire))",
                        }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.1) 50%, transparent 60%)",
                          }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                        />
                        <span className="relative z-10">
                          {step === STEPS.length - 1 ? "Claim My Spot" : "Continue"}
                        </span>
                        {step === STEPS.length - 1 ? (
                          <Sparkles size={14} className="relative z-10" />
                        ) : (
                          <ChevronRight size={14} className="relative z-10" />
                        )}
                      </motion.button>
                    </div>

                    {/* Step counter */}
                    <motion.p
                      className="text-center mt-5 font-body text-xs"
                      style={{ color: "hsl(var(--bone-muted) / 0.4)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Step {step + 1} of {STEPS.length}
                    </motion.p>
                  </>
                ) : (
                  /* ── Success ritual ── */
                  <motion.div className="text-center py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Expanding fire ring */}
                    <motion.div
                      className="relative w-28 h-28 mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "2px solid hsl(var(--fire) / 0.4)",
                          boxShadow:
                            "0 0 30px hsl(var(--fire) / 0.3), inset 0 0 20px hsl(var(--fire) / 0.1)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "1px solid hsl(var(--ember) / 0.2)",
                        }}
                        animate={{
                          scale: [1.1, 1.4, 1.1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-5xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        🔥
                      </motion.div>
                    </motion.div>

                    <motion.p
                      className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-3"
                      initial={{ opacity: 0, letterSpacing: "1em" }}
                      animate={{ opacity: 1, letterSpacing: "0.5em" }}
                      transition={{ delay: 0.4, duration: 1 }}
                    >
                      The Stones Accept You
                    </motion.p>
                    <motion.h3
                      className="text-display text-xl md:text-2xl font-bold text-carved tracking-[0.08em] mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      Welcome, {formData.name || "Warrior"}
                    </motion.h3>
                    <motion.p
                      className="font-body text-base text-bone-muted mb-2 max-w-sm mx-auto"
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Your name has been carved into the stone.
                      <br />
                      We'll send a signal fire to{" "}
                      <span style={{ color: "hsl(var(--fire))" }}>{formData.email}</span> when the
                      gathering begins.
                    </motion.p>
                    <motion.p
                      className="font-body text-xs mb-8"
                      style={{ color: "hsl(var(--bone-muted) / 0.5)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Tribe: {formData.university}
                    </motion.p>

                    {/* Tribal separator */}
                    <motion.div
                      className="flex items-center justify-center gap-3 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 1.1 }}
                    >
                      <div className="w-8 h-px" style={{ background: "hsl(var(--fire))" }} />
                      <Flame size={14} style={{ color: "hsl(var(--fire))" }} />
                      <div className="w-8 h-px" style={{ background: "hsl(var(--fire))" }} />
                    </motion.div>

                    <motion.button
                      onClick={handleClose}
                      className="btn-brand text-xs py-3 px-8 tracking-[0.25em]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "hsl(var(--fire))",
                        color: "hsl(var(--fire))",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Return to Camp
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
