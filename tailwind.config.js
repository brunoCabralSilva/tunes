/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '10vh': '10vh',
      '30vh': '30vh',
      '30vw': '30vw',
      '37vw': '37vw',
      '20vw': '20vw',
      '80vh': '82vh',
      '90vh': '90vh',
      '100vh': '100vh',
      '43vw': '42vw',
      '15vw': '13vw',
    },
    extend: {
      colors: {
        'half-transparent': 'rgb(0, 0, 0, 0.4)',
        'dark-transparent': 'rgb(0, 0, 0, 0.8)',
        'half-transparent2': 'rgb(255, 255, 255, 0.6)',
        'half-light': 'rgb(255, 255, 255, 0.2)',
        'light': '#d1daed',
        'dark': '#0D0F26',
        'more-dark': '#070813',
        'light-blue': '#b5c6eb',
      },
      spacing: {
        '40p': '40%',
        '10p': '10vh',
        '20p': '20vh',
        '80p': '80vh',
        '70': '17rem',
        '23%': '23%',
        '45%': '45%',
        '30%': '30%',
        '43vw': '42vw',
      '15vw': '13vw',
      },
      backgroundImage: {
        'party': 'url("https://images.unsplash.com/photo-1486556396467-d83d2b23514b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
        'party-2': 'url("https://images.unsplash.com/photo-1549046675-dd779977de88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80")',
        'party-3': 'url("https://wallpapers.com/images/high/blackout-smoke-party-background-7edl0jkpko5bin2u.jpg")',
        'party-4': 'url("https://pbs.twimg.com/media/D5-6D3fUYAAT-7h?format=jpg&name=large")',
      }
    },
  },
  plugins: [],
}

