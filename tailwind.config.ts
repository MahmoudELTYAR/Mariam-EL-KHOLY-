import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080808",
          soft: "#121212",
          elev: "#1A1A1A",
        },
        paper: {
          DEFAULT: "#EDE8DF",
          muted: "#B8B2A6",
          dim: "#7A756C",
        },
        volt: {
          DEFAULT: "#C5F24D",
          soft: "#A8D43A",
          dim: "#6F8F2A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)",
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.3vw, 1.125rem)",
        "fluid-lg": "clamp(1.15rem, 1rem + 0.6vw, 1.4rem)",
        "fluid-xl": "clamp(1.4rem, 1.1rem + 1.2vw, 2rem)",
        "fluid-2xl": "clamp(1.8rem, 1.2rem + 2.2vw, 3.25rem)",
        "fluid-3xl": "clamp(2.4rem, 1.4rem + 3.8vw, 5rem)",
        "fluid-hero": "clamp(3rem, 1.2rem + 8vw, 8.5rem)",
        "fluid-giant": "clamp(3.5rem, 1rem + 12vw, 11rem)",
      },
      spacing: {
        gutter: "clamp(1rem, 4vw, 3.5rem)",
        section: "clamp(4rem, 10vw, 9rem)",
      },
      transitionTimingFunction: {
        outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
        inOutSoft: "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, 1%)" },
          "50%": { transform: "translate(-1%, 4%)" },
          "70%": { transform: "translate(4%, -2%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        grain: "grain 8s steps(6) infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
