/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'permanent-marker': ['"Permanent Marker"', 'cursive'], // Add the Google Font here
        'austrailia':['"Edu AU VIC WA NT Pre"','cursive']
      },
    },
  },
  plugins: [],
}

