import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { z } from "zod";
import { X, Flame, Shield, Sword, Crown } from "lucide-react";
import stoneWallBg from "@/assets/stone-wall-bg.jpg";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Your name is required, warrior").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Enter a valid signal fire (email)").max(255, "Email must be less than 255 characters"),
  institution: z.string().trim().min(1, "Name your tribe (institution)").max(200, "Institution must be less than 200 characters"),
  experience: z.string().trim().min(1, "Choose your experience level"),
});

type FormData = z.infer<typeof registrationSchema>;

const experienceLevels = [
  { value: "novice", label: "Novice", subtitle: "First Hunt", icon: Flame },
  { value: "warrior", label: "Warrior", subtitle: "Battle-Tested", icon: Sword },
  { value: "elder", label: "Elder", subtitle: "Seasoned Leader", icon: Crown },
];

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

// Staggered form field variants
const fieldContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    institution: "",
    experience: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Track mouse for 3D tilt on the tablet
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXCard = useTransform(mouseY, [-200, 200], [3, -3]);
  const rotateYCard = useTransform(mouseX, [-200, 200], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: "", email: "", institution: "", experience: "" });
      setErrors({});
      setSubmitted(false);
      setFocusedField(null);
    }, 400);
  };

  // Progress indicator — how many fields are filled
  const filledCount = [formData.name, formData.email, formData.institution, formData.experience].filter(Boolean).length;

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
          {/* Backdrop with animated particles */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Stone tablet modal with 3D tilt */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
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
              className="relative rounded-none overflow-hidden"
              style={{
                backgroundImage: `url(${stoneWallBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: "hsl(var(--cave-deep) / 0.82)" }} />

              {/* Animated carved edge — glows when focused */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: focusedField
                    ? "inset 0 0 80px hsl(var(--cave-deep) / 0.5), inset 0 2px 0 hsl(var(--bone) / 0.08), 0 0 100px hsl(24 80% 50% / 0.12)"
                    : "inset 0 0 60px hsl(var(--cave-deep) / 0.5), inset 0 2px 0 hsl(var(--bone) / 0.06), 0 0 80px hsl(0 0% 0% / 0.6)",
                  borderColor: focusedField
                    ? "hsl(var(--fire) / 0.25)"
                    : "hsl(var(--bone) / 0.15)",
                }}
                transition={{ duration: 0.5 }}
                style={{ border: "2px solid hsl(var(--bone) / 0.15)" }}
              />

              {/* Animated corner runes — pulse when active */}
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
                {/* Close button with hover glow */}
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
                    <div className="text-center mb-8">
                      <motion.p
                        className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-3"
                        initial={{ opacity: 0, letterSpacing: "1em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ delay: 0.3, duration: 1 }}
                      >
                        Inscription Stone
                      </motion.p>
                      <motion.h3
                        className="text-display text-2xl md:text-3xl font-bold text-carved tracking-[0.08em]"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      >
                        Join the Tribe
                      </motion.h3>
                      <motion.div
                        className="section-divider w-20 mx-auto mt-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />

                      {/* Progress bar — carved stone filling with fire */}
                      <motion.div
                        className="w-32 h-1 mx-auto mt-4 overflow-hidden"
                        style={{ background: "hsl(var(--cave-mid))" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div
                          className="h-full"
                          style={{ background: "linear-gradient(90deg, hsl(var(--fire)), hsl(var(--ember)))" }}
                          animate={{ width: `${(filledCount / 4) * 100}%` }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      </motion.div>
                      <motion.p
                        className="font-body text-xs mt-2"
                        style={{ color: "hsl(var(--bone-muted))" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1 }}
                      >
                        {filledCount}/4 runes inscribed
                      </motion.p>
                    </div>

                    {/* Form with staggered fields */}
                    <motion.form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      variants={fieldContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <StoneField
                        label="Warrior Name"
                        value={formData.name}
                        onChange={(v) => handleChange("name", v)}
                        error={errors.name}
                        placeholder="Your true name"
                        fieldKey="name"
                        focusedField={focusedField}
                        onFocusChange={setFocusedField}
                        icon="🗡️"
                      />
                      <StoneField
                        label="Signal Fire (Email)"
                        value={formData.email}
                        onChange={(v) => handleChange("email", v)}
                        error={errors.email}
                        placeholder="warrior@tribe.com"
                        type="email"
                        fieldKey="email"
                        focusedField={focusedField}
                        onFocusChange={setFocusedField}
                        icon="🔥"
                      />
                      <StoneField
                        label="Tribe (Institution)"
                        value={formData.institution}
                        onChange={(v) => handleChange("institution", v)}
                        error={errors.institution}
                        placeholder="Name of your clan"
                        fieldKey="institution"
                        focusedField={focusedField}
                        onFocusChange={setFocusedField}
                        icon="🏔️"
                      />

                      {/* Experience select — interactive cards */}
                      <motion.div variants={fieldVariants}>
                        <label className="font-heading text-xs tracking-[0.3em] uppercase mb-3 block" style={{ color: "hsl(var(--bone-muted))" }}>
                          Battle Experience
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {experienceLevels.map((level, idx) => {
                            const isSelected = formData.experience === level.value;
                            const Icon = level.icon;
                            return (
                              <motion.button
                                key={level.value}
                                type="button"
                                onClick={() => handleChange("experience", level.value)}
                                className="relative text-center px-3 py-4 font-body text-xs transition-colors"
                                style={{
                                  background: isSelected ? "hsl(var(--fire) / 0.15)" : "hsl(var(--cave-mid) / 0.5)",
                                  border: isSelected ? "1px solid hsl(var(--fire) / 0.5)" : "1px solid hsl(var(--border))",
                                  color: isSelected ? "hsl(var(--bone))" : "hsl(var(--bone-muted))",
                                  overflow: "hidden",
                                }}
                                whileHover={{
                                  scale: 1.04,
                                  borderColor: "hsl(var(--fire) / 0.4)",
                                  boxShadow: "0 0 25px hsl(var(--fire) / 0.1)",
                                }}
                                whileTap={{ scale: 0.96 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  layout: { type: "spring", stiffness: 300, damping: 25 },
                                  default: { delay: 0.8 + idx * 0.1, duration: 0.5 },
                                }}
                              >
                                {/* Selection glow */}
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      className="absolute inset-0"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      style={{
                                        background: "radial-gradient(circle at center, hsl(var(--fire) / 0.15) 0%, transparent 70%)",
                                      }}
                                    />
                                  )}
                                </AnimatePresence>

                                <motion.div
                                  className="relative z-10"
                                  animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                                  transition={{ duration: 0.4 }}
                                >
                                  <Icon
                                    size={20}
                                    className="mx-auto mb-2"
                                    style={{ color: isSelected ? "hsl(var(--fire))" : "hsl(var(--bone-muted))" }}
                                  />
                                  <p className="font-heading text-xs tracking-[0.15em] uppercase">{level.label}</p>
                                  <p className="text-[10px] mt-0.5 opacity-60">{level.subtitle}</p>
                                </motion.div>

                                {/* Check indicator */}
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center"
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0, rotate: 180 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    >
                                      <Shield size={12} style={{ color: "hsl(var(--fire))" }} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.button>
                            );
                          })}
                        </div>
                        <AnimatePresence>
                          {errors.experience && (
                            <motion.p
                              className="text-xs mt-1.5 font-body"
                              style={{ color: "hsl(var(--fire))" }}
                              initial={{ opacity: 0, y: -5, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -5, height: 0 }}
                            >
                              {errors.experience}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Submit — with animated fire glow */}
                      <motion.div className="pt-4" variants={fieldVariants}>
                        <motion.button
                          type="submit"
                          className="btn-brand-filled w-full text-sm md:text-base relative overflow-hidden group"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 60px hsla(24, 80%, 50%, 0.5), 0 0 120px hsla(24, 80%, 50%, 0.2)",
                          }}
                          whileTap={{ scale: 0.97 }}
                          animate={
                            filledCount === 4
                              ? {
                                  boxShadow: [
                                    "0 0 20px hsla(24, 80%, 50%, 0.2)",
                                    "0 0 40px hsla(24, 80%, 50%, 0.4), 0 0 80px hsla(24, 80%, 50%, 0.15)",
                                    "0 0 20px hsla(24, 80%, 50%, 0.2)",
                                  ],
                                }
                              : {}
                          }
                          transition={
                            filledCount === 4
                              ? { boxShadow: { repeat: Infinity, duration: 2 }, default: { type: "spring", stiffness: 300, damping: 15 } }
                              : { type: "spring", stiffness: 300, damping: 15 }
                          }
                        >
                          {/* Shimmer sweep */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.12) 50%, transparent 60%)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                          />
                          <span className="relative z-10">Inscribe My Name</span>
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  </>
                ) : (
                  /* Success state — dramatic reveal */
                  <motion.div className="text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Expanding fire ring */}
                    <motion.div
                      className="relative w-24 h-24 mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "2px solid hsl(var(--fire) / 0.4)",
                          boxShadow: "0 0 30px hsl(var(--fire) / 0.3), inset 0 0 20px hsl(var(--fire) / 0.1)",
                        }}
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
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
                      className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-4"
                      initial={{ opacity: 0, letterSpacing: "1em" }}
                      animate={{ opacity: 1, letterSpacing: "0.5em" }}
                      transition={{ delay: 0.4, duration: 1 }}
                    >
                      The Stones Accept You
                    </motion.p>
                    <motion.h3
                      className="text-display text-2xl md:text-3xl font-bold text-carved tracking-[0.08em] mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      Welcome, {formData.name || "Warrior"}
                    </motion.h3>
                    <motion.p
                      className="font-body text-lg text-bone-muted mb-8 max-w-sm mx-auto"
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Your name has been carved into the sacred stone. The tribe awaits your arrival at the gathering.
                    </motion.p>

                    {/* Animated tribal separator */}
                    <motion.div
                      className="flex items-center justify-center gap-3 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 1 }}
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
                      transition={{ delay: 1.2 }}
                      whileHover={{ scale: 1.05, borderColor: "hsl(var(--fire))", color: "hsl(var(--fire))" }}
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

/* Highly interactive stone-carved input field */
function StoneField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  fieldKey,
  focusedField,
  onFocusChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  fieldKey: string;
  focusedField: string | null;
  onFocusChange: (key: string | null) => void;
  icon: string;
}) {
  const isFocused = focusedField === fieldKey;
  const isFilled = value.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div variants={fieldVariants}>
      <div className="flex items-center gap-2 mb-2">
        <motion.span
          className="text-sm"
          animate={isFocused ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
        <label
          className="font-heading text-xs tracking-[0.3em] uppercase cursor-pointer"
          style={{ color: isFocused ? "hsl(var(--bone))" : "hsl(var(--bone-muted))" }}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </label>
        {/* Filled indicator */}
        <AnimatePresence>
          {isFilled && !error && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-xs"
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Glow underline when focused */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--fire)), transparent)",
          }}
          animate={{
            opacity: isFocused ? 1 : 0,
            scaleX: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={type === "email" ? 255 : 200}
          className="w-full px-4 py-3 font-body text-base outline-none transition-all duration-300 placeholder:opacity-30"
          style={{
            background: isFocused ? "hsl(var(--cave-mid) / 0.7)" : "hsl(var(--cave-mid) / 0.5)",
            border: error
              ? "1px solid hsl(var(--fire))"
              : isFocused
                ? "1px solid hsl(var(--fire) / 0.5)"
                : "1px solid hsl(var(--border))",
            color: "hsl(var(--bone))",
            boxShadow: isFocused
              ? "var(--shadow-carved), 0 0 20px hsl(var(--fire) / 0.08)"
              : error
                ? "var(--shadow-carved), 0 0 15px hsl(var(--fire) / 0.1)"
                : "var(--shadow-carved)",
          }}
          onFocus={() => onFocusChange(fieldKey)}
          onBlur={() => onFocusChange(null)}
        />
      </motion.div>

      {/* Animated error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs mt-1.5 font-body flex items-center gap-1"
            style={{ color: "hsl(var(--fire))" }}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              ⚠
            </motion.span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RegistrationModal;
