/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html', './src/**/*.{js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: { sans: [], serif: [], mono: []}
    },
  },
  plugins: [],
}
