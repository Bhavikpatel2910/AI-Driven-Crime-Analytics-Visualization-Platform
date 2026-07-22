/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Command-center palette (spec §4)
        bg: {
          DEFAULT: "#07111F", // main background
          secondary: "#0A1625",
          sidebar: "#081522",
        },
        surface: {
          DEFAULT: "#0D1B2A",
          elevated: "#112438",
        },
        border: {
          DEFAULT: "#1E3448",
        },
        cyan: { DEFAULT: "#22D3EE" },
        brand: { DEFAULT: "#3B82F6" }, // secondary blue
        success: { DEFAULT: "#22C55E" },
        warning: { DEFAULT: "#F59E0B" },
        critical: { DEFAULT: "#EF4444" },
        intel: { DEFAULT: "#8B5CF6" }, // purple intelligence accent
        text: {
          DEFAULT: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.35), 0 8px 24px -12px rgba(0,0,0,0.55)",
        "glow-critical": "0 0 0 1px rgba(239,68,68,0.4), 0 0 20px -4px rgba(239,68,68,0.45)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.35), 0 0 20px -6px rgba(34,211,238,0.4)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in": "fade-in 0.25s ease-out",
        "slide-in-right": "slide-in-right 0.22s cubic-bezier(0.32,0.72,0,1)",
      },
    },
  },
  plugins: [],
};
