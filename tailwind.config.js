/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'half-transparent': 'rgb(255, 255, 255, 0.9)',
        'lilas': '#8B9DC3',
      },
    },
  },
  plugins: [],
}

