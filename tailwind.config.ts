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
          card: "#080808",
          cardHover: "#0f0f0f",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.22)",
          subtle: "#171717",
          muted: "#737373",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Liberation Mono'",
          "'Courier New'",
          "monospace",
        ],
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
        "amoled-glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.2)",
        "amoled-glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.2)",
        "amoled-glow-violet": "0 0 35px -5px rgba(139, 92, 246, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
