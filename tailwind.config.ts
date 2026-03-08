import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C5A059",
          light: "#D4B76A",
          dark: "#A8873D",
          50: "#FBF7EE",
          100: "#F5ECD5",
          200: "#EBDAAB",
          300: "#DFC681",
          400: "#D4B36A",
          500: "#C5A059",
          600: "#A8873D",
          700: "#8A6E30",
          800: "#6D5625",
          900: "#503F1B",
        },
        luxury: {
          black: "#050505",
          charcoal: "#0A0A0A",
          darkGray: "#141414",
          mediumGray: "#4A4A4A",
          lightGray: "#F5F5F5",
          white: "#FFFFFF",
          red: "#8B1A1A",
          redLight: "#A52929",
          surface: "#111111",
          muted: "#1E1E1E",
        },
      },
      fontSize: {
        "display-xl": [
          "clamp(4rem, 10vw, 11rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(3rem, 7vw, 7.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-opensans)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C5A059 0%, #D4B76A 50%, #C5A059 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(212,183,106,0.4) 50%, transparent 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #000000 0%, #1A1A1A 100%)",
        "dark-overlay":
          "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
        "dark-editorial":
          "linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #050505 100%)",
        "hero-overlay":
          "linear-gradient(90deg, #050505 0%, #050505 40%, transparent 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(197, 160, 89, 0.3)",
        "gold-lg": "0 0 40px rgba(197, 160, 89, 0.4)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slow-zoom": "slowZoom 15s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// Adds each Tailwind color as a global CSS variable, e.g. var(--gold-500)
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

export default config;
