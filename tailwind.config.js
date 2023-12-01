const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      height: {
        nav: 60,
        main: 'calc(100vh - 60px)',
      },
      spacing: {
        nav: 60,
      },
      aria: {
        'current-page': 'current="page"',
      },
    },
  },
  plugins: [],
}
