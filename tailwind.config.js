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
      keyframes: {
        hitZak: {
          '0%': { left: 0, transform: 'translateX(-1%)' },
          '100%': { left: '100%', transform: 'translateX(-99%)' },
        },
        flash: {
          '0%': {
            backgroundColor: 'rgba(67, 56, 202, 0.13)',
            boxShadow: '24px 0 rgba(67, 56, 202, 0.13), -24px 0 rgba(67, 56, 202, 1)',
          },
          '50%': {
            backgroundColor: 'rgba(67, 56, 202, 1)',
            boxShadow: '24px 0 rgba(67, 56, 202, 0.13), -24px 0 rgba(67, 56, 202, 0.13)',
          },
          '100%': {
            backgroundColor: 'rgba(67, 56, 202, 0.13)',
            boxShadow: '24px 0 rgba(67, 56, 202, 1), -24px 0 rgba(67, 56, 202, 0.13)',
          },
        },
      },
      animation: {
        hitZak: 'hitZak 0.8s linear infinite alternate',
        flash: 'flash 0.5s ease-out infinite alternate',
      },
    },
  },
  plugins: [],
}
