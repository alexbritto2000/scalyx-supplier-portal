const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        sanspro: ["SourceSansPro", "sans-serif"], // Why Add sans-serif as a Fallback? If the browser cannot load the custom font it will fall back to a generic font like sans-serif.(Font Loading Issues)
      },
      boxShadow: {
        'custom-hover': '0px 0px 10px 0px #F25C0580',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "theme-color": "#F25C05",
        // "navigation-hover": "#FFF7F1",
        "active-font": "#000000",
        "in-active-font": "#989BA6",
        "secondary-color": "#023F5C",
      },
      animation: {
        blink: "blink 1.2s infinite both",
      },
      keyframes: {
        blink: {
          "0%, 80%, 100%": { opacity: "0" },
          "40%": { opacity: "1" },
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
  rules: {
    "tailwindcss/no-custom-classname": "off",
  },
};
