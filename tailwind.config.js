/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backg: '#f9f9f9',
        darkblue: '#0E0E2C',
        body:'#4A4A68',
        primary: '#1343C7',
        del: '#F23577',
        darkgrey: '#AFAFB9'
      },
      maxWidth: {
        'page': '1200px',
      }
    },
  },
  plugins: [],
}

