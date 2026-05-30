import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201c",
        pitch: "#235f46",
        chalk: "#f7f4eb",
        touchline: "#d9ecdf",
        signal: "#f0b84f",
        bench: "#315f8d"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-archivo)",
          "var(--font-inter)",
          "ui-sans-serif",
          "sans-serif"
        ]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(23, 32, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
