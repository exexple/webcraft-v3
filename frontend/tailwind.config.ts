import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        "space-mono": ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
      fontSize: {
        "h1": ["96px", { lineHeight: "1.1", fontWeight: "900" }],
        "h1-mobile": ["56px", { lineHeight: "1.1", fontWeight: "900" }],
        "h2": ["64px", { lineHeight: "1.2", fontWeight: "800" }],
        "h2-mobile": ["40px", { lineHeight: "1.2", fontWeight: "800" }],
        "h3": ["48px", { lineHeight: "1.3", fontWeight: "700" }],
        "h3-mobile": ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        "h4": ["36px", { lineHeight: "1.4", fontWeight: "700" }],
        "h4-mobile": ["24px", { lineHeight: "1.4", fontWeight: "700" }],
        "h5": ["28px", { lineHeight: "1.4", fontWeight: "600" }],
        "h5-mobile": ["22px", { lineHeight: "1.4", fontWeight: "600" }],
        "h6": ["22px", { lineHeight: "1.5", fontWeight: "600" }],
        "h6-mobile": ["18px", { lineHeight: "1.5", fontWeight: "600" }],
        "body-display": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-base": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      letterSpacing: {
        "tight-sm": "-0.02em",
        "tight": "-0.01em",
        "normal": "0",
        "loose": "0.01em",
        "looser": "0.1em",
      },
      spacing: {
        // Micro spacing (internal elements) — 8px base unit
        "spacing-xs": "8px",
        "spacing-sm": "12px",
        "spacing-md": "16px",
        "spacing-lg": "24px",
        "spacing-xl": "32px",
        "spacing-2xl": "48px",
        "spacing-3xl": "64px",
        "spacing-4xl": "96px",

        // Section spacing
        "section-compact": "48px",
        "section-normal": "64px",
        "section-spacious": "96px",
        "section-ultra": "128px",

        // Container padding
        "container-px-mobile": "16px",
        "container-px-tablet": "24px",
        "container-px-desktop": "32px",

        // Legacy section spacing (kept for backward compatibility)
        "section-xs": "2rem",
        "section-sm": "3rem",
        "section-md": "4rem",
        "section-lg": "6rem",
        "section-xl": "8rem",
        "heading-gap-sm": "1rem",
        "heading-gap-md": "1.5rem",
        "heading-gap-lg": "2rem",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "blob": "blob-move 12s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "scroll-bounce": "scroll-bounce 1.5s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "blob-move": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, -20px) scale(1.05)" },
          "50%": { transform: "translate(-20px, 30px) scale(0.95)" },
          "75%": { transform: "translate(15px, -15px) scale(1.03)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.2)" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.5" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.15)",
        "glow-violet": "0 0 20px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.15)",
        "glow-sm-cyan": "0 0 10px rgba(6, 182, 212, 0.3)",
        "premium": "0 20px 60px rgba(0,0,0,0.5), 0 4px 20px rgba(6, 182, 212, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
