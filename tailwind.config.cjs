const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        smoothLg: `0 1px 1px rgba(0,0,0,0.12), 
        0 2px 2px rgba(0,0,0,0.12), 
        0 4px 4px rgba(0,0,0,0.12), 
        0 8px 8px rgba(0,0,0,0.12),
        0 16px 16px rgba(0,0,0,0.12);`,
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string"
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
    require("@tailwindcss/typography"),
  ],
};
