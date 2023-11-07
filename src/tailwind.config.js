/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'mainColor': '#9d164d',
      }
    }
  },
  variants: {},
  plugins: [],
}