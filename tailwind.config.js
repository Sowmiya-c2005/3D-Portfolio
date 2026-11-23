/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#04080f",
        "bg-2":    "#070d1a",
        surface:   "#0b1221",
        "surface-2":"#0f1a2e",
        blue:      "#00c3ff",
        violet:    "#7b4fff",
        silver:    "#98aac4",
        muted:     "#4a5a72",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
