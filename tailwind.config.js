/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
     backgroundImage:{
      'sun': "url('assets/Img/sun.svg')",
      'moon': "url('assets/Img/moon.svg')",
     },
      colors:{
        "primary": {
          "50": "#F0FCF9",
          "100": "#D9F7F2",
          "200": "#B3F0E2",
          "300": "#80E6CF",
          "400": "#4FD1B5",
          "500": "#27AE8A",
          "600": "#219D8F",
          "700": "#1F8A78",
          "800": "#1C7463",
          "900": "#145C48",
          "950": "#0D3A2E"
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

