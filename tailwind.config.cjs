/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff5c00',
        secondary: '#d764e1',
        neutral: '#00775d',
      },
    },
  },
  plugins: [],
};
