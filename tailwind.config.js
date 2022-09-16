const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
          'gentian-blue': '#004A73',
          'ball-blue': '#2CA3D5',
          'office-green': '#008312',
          default: {
            100: '#94B2C0',
            200: '#799EB0',
            300: '#5F8BA1',
            400: '#447791',
            500: '#296481',
            600: '#235872',
            700: '#1C4C63',
            800: '#174054',
            900: '#113344'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}