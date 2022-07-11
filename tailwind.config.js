/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '10vh': '10vh',
      '30vh': '30vh',
      '80vh': '82vh',
      '90vh': '90vh',
      '100vh': '100vh',
    },
    extend: {
      colors: {
        'half-transparent': 'rgb(0, 0, 0, 0.4)',
        'half-transparent2': 'rgb(255, 255, 255, 0.6)',
        'half-light': 'rgb(255, 255, 255, 0.2)',
        'light': '#d1daed',
        'dark': '#0D0F26',
        'more-dark': '#070813',
      },
      spacing: {
        '40p': '40%',
        '10p': '10vh',
        '20p': '20vh',
        '80p': '80vh',
        '70': '17rem',
      },
      backgroundImage: {
        'party': 'url("https://images.unsplash.com/photo-1486556396467-d83d2b23514b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
        'party-2': 'url("https://images.unsplash.com/photo-1549046675-dd779977de88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80")',
      }
    },
  },
  plugins: [],
}

