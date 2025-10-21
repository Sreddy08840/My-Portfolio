/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#38bdf8',
        dark: '#0f172a',
        darker: '#020617',
      },
    },
  },
  plugins: [],
}
