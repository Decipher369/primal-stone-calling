import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Cinzel Decorative", "serif"],
        heading: ["Cinzel", "serif"],
        body: ["IM Fell English", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        fire: "hsl(var(--fire))",
        ember: "hsl(var(--ember))",
        bone: "hsl(var(--bone))",
        forest: "hsl(var(--forest))",
        "forest-dark": "hsl(var(--forest-dark))",
        moss: "hsl(var(--moss))",
        "slate-dark": "hsl(var(--slate-dark))",
        "slate-mid": "hsl(var(--slate-mid))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "stone-clash-left": {
          "0%": { transform: "translateX(-50vw)" },
          "70%": { transform: "translateX(2%)" },
          "85%": { transform: "translateX(-1%)" },
          "100%": { transform: "translateX(0)" },
        },
        "stone-clash-right": {
          "0%": { transform: "translateX(50vw)" },
          "70%": { transform: "translateX(-2%)" },
          "85%": { transform: "translateX(1%)" },
          "100%": { transform: "translateX(0)" },
        },
        "stone-part-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-60vw)" },
        },
        "stone-part-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(60vw)" },
        },
        "logo-reveal": {
          "0%": { opacity: "0", transform: "scale(0.8)", filter: "brightness(3) blur(10px)" },
          "50%": { opacity: "1", filter: "brightness(2) blur(2px)" },
          "100%": { opacity: "1", transform: "scale(1)", filter: "brightness(1) blur(0px)" },
        },
        "flash": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stone-clash-left": "stone-clash-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "stone-clash-right": "stone-clash-right 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "stone-part-left": "stone-part-left 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "stone-part-right": "stone-part-right 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "logo-reveal": "logo-reveal 1.5s ease-out forwards",
        "flash": "flash 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
