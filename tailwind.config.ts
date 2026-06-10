import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-grotesk)", "Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "ui-monospace", "monospace"],
        display: ["var(--font-grotesk)", "Space Grotesk", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        bg: "#0c1117",
        surface: "#12192a",
        surface2: "#1a2438",
        neon: "#1fd172",
        gold: "#f0a020"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(23, 32, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
