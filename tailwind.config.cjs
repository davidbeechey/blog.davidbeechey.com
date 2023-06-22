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
        "blog-title": ["Space Mono", "monospace"],
        "blog-text": ["DM Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
        "blog-heading": ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
