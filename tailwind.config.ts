import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ededed",
        amoled: {
          bg: "#000000",
          card: "#09090b",
          cardHover: "#0e0e12",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.2)",
          subtle: "#121216",
          muted: "#71717a",
        },
      },
      fontFamily: {
        sans: ["var(--font-custom)", "sans-serif"],
        serif: ["var(--font-custom)", "serif"],
        mono: ["var(--font-custom)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 6s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.2))" },
          "100%": { opacity: "0.8", filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.4))" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        "amoled-glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.25)",
        "amoled-glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.25)",
        "amoled-glow-violet": "0 0 35px -5px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
