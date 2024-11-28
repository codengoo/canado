/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}', // <== Update this
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fbfbfb',
        secondary: '#719191',
        tertiary: '#eaf1f1',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
