const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.rose,
      },
      fontFamily: {
        title: [
          "Libre Baskerville",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          "Work Sans Variable",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
