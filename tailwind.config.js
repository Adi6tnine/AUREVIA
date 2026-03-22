/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#FCE9F1',
        purple: '#E6DDF8',
        sky: '#DDF0FF',
        cream: '#FDFBF7',
        taupe: '#2C2826',
      },
    },
  },
  plugins: [],
};
