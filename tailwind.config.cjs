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
        // "blog-title": ["DM Mono", "monospace"],
        "blog-title": [
          "Space Grotesk Variable",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
        "blog-text": ["DM Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
        // "blog-heading": [
        //   "Rubik",
        //   "sans-serif",
        //   ...defaultTheme.fontFamily.sans,
        // ],
        "big-heading": ["Rubik", "sans-serif", ...defaultTheme.fontFamily.sans],
        "blog-heading": [
          "Space Grotesk Variable",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
