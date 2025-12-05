import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1320px"
      }
    },
    extend: {
      colors: {
        brand: {
          sun: "#FFD700",
          leaf: "#00A859",
          sky: "#4FC3F7",
          midnight: "#1D2A40"
        },
        background: "var(--fs-background)",
        foreground: "var(--fs-foreground)",
        border: "var(--fs-border)",
        muted: {
          DEFAULT: "var(--fs-muted)",
          foreground: "var(--fs-muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--fs-accent)",
          foreground: "var(--fs-accent-foreground)"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        lg: "14px",
        md: "12px",
        sm: "10px"
      },
      boxShadow: {
        card: "0 12px 40px rgba(29, 42, 64, 0.12)"
      },
      keyframes: {
        "pulse-border": {
          "0%": { boxShadow: "0 0 0 0 rgba(79, 195, 247, 0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(79, 195, 247, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(79, 195, 247, 0)" }
        }
      },
      animation: {
        "pulse-border": "pulse-border 2.4s ease infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
