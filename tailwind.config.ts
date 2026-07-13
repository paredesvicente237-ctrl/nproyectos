import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060E1A",
          900: "#0B1B33",
          800: "#132F53",
          700: "#1D4479",
          600: "#1E40AF",
          500: "#2563EB",
          400: "#60A5FA",
          300: "#93C5FD",
          200: "#BFDBFE",
          100: "#DBEAFE",
          50: "#EFF6FF",
        },
        slate: {
          950: "#0F172A",
          900: "#1E293B",
          800: "#334155",
          700: "#475569",
          600: "#64748B",
          500: "#94A3B8",
          400: "#CBD5E1",
          300: "#E2E8F0",
          200: "#F1F5F9",
          100: "#F8FAFC",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-right": {
          "0%": { width: "0" },
          "100%": { width: "3rem" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-right": "slide-right 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
