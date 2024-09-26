const HEADER_HEIGHT = '4rem' // 64px
const APP_WIDTH = '87.5rem' // 1400px

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        'app-width': APP_WIDTH,
        'header-height': HEADER_HEIGHT,
        'main-height': `calc(100dvh - ${HEADER_HEIGHT} - 1px)`,
      },
      screens: {
        'app-screen': APP_WIDTH,
      },
      padding: {
        'content-layout': `calc((100dvw - ${APP_WIDTH}) / 2)`,
      },
      keyframes: {
        progressIndeterminate: {
          '0%': { left: 0, transform: 'translateX(-1%)' },
          '100%': { left: '100%', transform: 'translateX(-99%)' },
        },
      },
      animation: {
        progressIndeterminate: 'progressIndeterminate 0.8s linear infinite alternate',
      },
      aria: {
        'current-page': 'current="page"',
      },
    },
  },
  darkMode: 'selector',
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}
