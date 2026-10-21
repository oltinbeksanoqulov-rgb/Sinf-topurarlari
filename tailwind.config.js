/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          darkest: '#050811',
          dark: '#0a0f1d',
          card: '#0f172a',
          cardHover: '#15213b',
          border: 'rgba(56, 189, 248, 0.15)',
          borderHover: 'rgba(0, 245, 118, 0.4)',
        },
        neon: {
          green: '#00f576',
          lime: '#39ff14',
          glow: 'rgba(0, 245, 118, 0.25)',
        },
        football: {
          gold: '#f59e0b',
          silver: '#94a3b8',
          bronze: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px -3px rgba(0, 245, 118, 0.35)',
        'neon-lg': '0 0 35px -5px rgba(0, 245, 118, 0.45)',
        'blue-glow': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
      }
    },
  },
  plugins: [],
}
