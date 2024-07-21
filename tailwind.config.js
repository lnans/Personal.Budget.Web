/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
      },
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
  },
  darkMode: 'selector',
  plugins: [],
}
