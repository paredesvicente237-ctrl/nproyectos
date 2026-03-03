import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: "#08111A",
          900: "#0D1F2F",
          800: "#163247",
          700: "#214D67",
          600: "#3B6C86",
        },
        industrial: {
          500: "#556977",
          400: "#778997",
          300: "#A6B3BC",
          200: "#D6DEE4",
          100: "#E9EEF2",
          50: "#F6F8FA",
        },
        accent: {
          DEFAULT: "#10B8F4",
          hover: "#0998CC",
          soft: "#DCF7FF",
        },
      },
      fontFamily: {
        heading: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
