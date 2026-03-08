import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { X } from "lucide-react";
import stoneWallBg from "@/assets/stone-wall-bg.jpg";

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Your name is required, warrior")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid signal fire (email)")
    .max(255, "Email must be less than 255 characters"),
  institution: z
    .string()
    .trim()
    .min(1, "Name your tribe (institution)")
    .max(200, "Institution must be less than 200 characters"),
  experience: z
    .string()
    .trim()
    .min(1, "Choose your experience level"),
});

type FormData = z.infer<typeof registrationSchema>;

const experienceLevels = [
  { value: "novice", label: "Novice — First Hunt" },
  { value: "warrior", label: "Warrior — Battle-Tested" },
  { value: "elder", label: "Elder — Seasoned Leader" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const tabletVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 60, rotateX: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: { duration: 0.3 },
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
    // Reset after animation
    setTimeout(() => {
      setFormData({ name: "", email: "", institution: "", experience: "" });
      setErrors({});
      setSubmitted(false);
    }, 400);
  };

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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Stone tablet modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
            variants={tabletVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative rounded-none overflow-hidden"
              style={{
                backgroundImage: `url(${stoneWallBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay for readability */}
              <div
                className="absolute inset-0"
                style={{ background: "hsl(var(--cave-deep) / 0.82)" }}
              />

              {/* Carved edge borders */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "2px solid hsl(var(--bone) / 0.15)",
                  boxShadow:
                    "inset 0 0 60px hsl(var(--cave-deep) / 0.5), inset 0 2px 0 hsl(var(--bone) / 0.06), 0 0 80px hsl(0 0% 0% / 0.6)",
                }}
              />

              {/* Corner runes */}
              <div className="absolute top-3 left-3 w-6 h-6 opacity-20" style={{ borderTop: "2px solid hsl(var(--fire))", borderLeft: "2px solid hsl(var(--fire))" }} />
              <div className="absolute top-3 right-3 w-6 h-6 opacity-20" style={{ borderTop: "2px solid hsl(var(--fire))", borderRight: "2px solid hsl(var(--fire))" }} />
              <div className="absolute bottom-3 left-3 w-6 h-6 opacity-20" style={{ borderBottom: "2px solid hsl(var(--fire))", borderLeft: "2px solid hsl(var(--fire))" }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 opacity-20" style={{ borderBottom: "2px solid hsl(var(--fire))", borderRight: "2px solid hsl(var(--fire))" }} />

              <div className="relative z-10 p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 transition-colors"
                  style={{ color: "hsl(var(--bone-muted))" }}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {!submitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.p
                        className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        Inscription Stone
                      </motion.p>
                      <motion.h3
                        className="text-display text-2xl md:text-3xl font-bold text-carved tracking-[0.08em]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        Join the Tribe
                      </motion.h3>
                      <motion.div
                        className="section-divider w-20 mx-auto mt-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />
                    </div>

                    {/* Form */}
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <StoneField
                        label="Warrior Name"
                        value={formData.name}
                        onChange={(v) => handleChange("name", v)}
                        error={errors.name}
                        placeholder="Your true name"
                        delay={0.6}
                      />
                      <StoneField
                        label="Signal Fire (Email)"
                        value={formData.email}
                        onChange={(v) => handleChange("email", v)}
                        error={errors.email}
                        placeholder="warrior@tribe.com"
                        type="email"
                        delay={0.7}
                      />
                      <StoneField
                        label="Tribe (Institution)"
                        value={formData.institution}
                        onChange={(v) => handleChange("institution", v)}
                        error={errors.institution}
                        placeholder="Name of your clan"
                        delay={0.8}
                      />

                      {/* Experience select */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                      >
                        <label className="font-heading text-xs tracking-[0.3em] uppercase mb-2 block" style={{ color: "hsl(var(--bone-muted))" }}>
                          Battle Experience
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {experienceLevels.map((level) => (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => handleChange("experience", level.value)}
                              className="text-left px-4 py-3 transition-all duration-300 font-body text-sm"
                              style={{
                                background:
                                  formData.experience === level.value
                                    ? "hsl(var(--fire) / 0.15)"
                                    : "hsl(var(--cave-mid) / 0.5)",
                                border:
                                  formData.experience === level.value
                                    ? "1px solid hsl(var(--fire) / 0.5)"
                                    : "1px solid hsl(var(--border))",
                                color:
                                  formData.experience === level.value
                                    ? "hsl(var(--bone))"
                                    : "hsl(var(--bone-muted))",
                                boxShadow:
                                  formData.experience === level.value
                                    ? "0 0 20px hsl(var(--fire) / 0.1)"
                                    : "none",
                              }}
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                        {errors.experience && (
                          <p className="text-xs mt-1.5 font-body" style={{ color: "hsl(var(--fire))" }}>
                            {errors.experience}
                          </p>
                        )}
                      </motion.div>

                      {/* Submit */}
                      <motion.div
                        className="pt-4"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        <motion.button
                          type="submit"
                          className="btn-brand-filled w-full text-sm md:text-base"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 50px hsla(24, 80%, 50%, 0.4), 0 0 100px hsla(24, 80%, 50%, 0.15)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Inscribe My Name
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  </>
                ) : (
                  /* Success state */
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="text-6xl mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      🔥
                    </motion.div>
                    <p className="font-heading text-xs tracking-[0.5em] uppercase text-fire mb-4">
                      The Stones Accept You
                    </p>
                    <h3 className="text-display text-2xl md:text-3xl font-bold text-carved tracking-[0.08em] mb-4">
                      Welcome, Warrior
                    </h3>
                    <p className="font-body text-lg text-bone-muted mb-8 max-w-sm mx-auto">
                      Your name has been carved into the sacred stone. The tribe awaits your arrival at the gathering.
                    </p>
                    <motion.button
                      onClick={handleClose}
                      className="btn-brand text-xs py-3 px-8 tracking-[0.25em]"
                      whileHover={{ scale: 1.05 }}
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

/* Individual input field styled as stone-carved groove */
function StoneField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  delay = 0.5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <label className="font-heading text-xs tracking-[0.3em] uppercase mb-2 block" style={{ color: "hsl(var(--bone-muted))" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={type === "email" ? 255 : 200}
        className="w-full px-4 py-3 font-body text-base outline-none transition-all duration-300 placeholder:opacity-30"
        style={{
          background: "hsl(var(--cave-mid) / 0.5)",
          border: error ? "1px solid hsl(var(--fire))" : "1px solid hsl(var(--border))",
          color: "hsl(var(--bone))",
          boxShadow: "var(--shadow-carved)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "hsl(var(--fire) / 0.5)";
          e.currentTarget.style.boxShadow = "var(--shadow-carved), 0 0 15px hsl(var(--fire) / 0.1)";
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "hsl(var(--border))";
            e.currentTarget.style.boxShadow = "var(--shadow-carved)";
          }
        }}
      />
      {error && (
        <p className="text-xs mt-1.5 font-body" style={{ color: "hsl(var(--fire))" }}>
          {error}
        </p>
      )}
    </motion.div>
  );
}

export default RegistrationModal;
