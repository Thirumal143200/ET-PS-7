/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0d14',
          card: '#121824',
          border: '#1e293b',
          accent: '#00f0ff',
          neonGreen: '#10b981',
          neonAmber: '#f59e0b',
          neonRed: '#ef4444',
          purple: '#8b5cf6'
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.25)',
        'neon-red': '0 0 15px rgba(239, 68, 68, 0.3)',
        'neon-green': '0 0 15px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
