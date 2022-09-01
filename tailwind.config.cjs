/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/frontend/**/*.{html,js,svelte,ts}', './public/**/**.{html,js,svelte,ts}'],
  theme: {
      extend: {}
  },
  important: true, // <-- adding this line will give your tailwind classes !important by default
  plugins: []
};
