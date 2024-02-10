/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark-theme"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    `src/**/*.{js,ts,jsx,tsx}`,
    "../../packages/core/src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)", "system-ui", "sans-serif"],
        default: ["var(--font-default)", "system-ui", "sans-serif"],
      },
      colors: {
        white: "var(--collhub-white)",
        stone: {
          50: "var(--collhub-stone-50)",
          100: "var(--collhub-stone-100)",
          200: "var(--collhub-stone-200)",
          300: "var(--collhub-stone-300)",
          400: "var(--collhub-stone-400)",
          500: "var(--collhub-stone-500)",
          600: "var(--collhub-stone-600)",
          700: "var(--collhub-stone-700)",
          800: "var(--collhub-stone-800)",
          900: "var(--collhub-stone-900)",
        },
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
