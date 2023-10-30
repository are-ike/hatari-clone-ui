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
        darkgrey: '#AFAFB9',
        btnHover: '#002FB3',
        btnDisabled: '#6282DA',
        blueLight:'#D0D9F4',
        green: '#31D0AA'
      },
      maxWidth: {
        'page': '1200px',
      }
    },
  },
  plugins: [],
}

