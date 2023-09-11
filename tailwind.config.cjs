/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-seri'],
      },
      colors: {
        general: '#0081A7',
        primary: '#00AFB9',
        secondary: '#F07167',
        optional: '#FED9B7',
        'dark-gray': '#6C757D',
        'ligth-gray': '#CDCDCD',
        success: '#22bb33',
        danger: '#F32013',
        warning: '#ffcc00',
      },
    },
  },
  plugins: [],
}
