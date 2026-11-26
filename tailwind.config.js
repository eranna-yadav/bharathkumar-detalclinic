import config from './site.config.js'

const c = config.brand.colors

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: c.primary, dark: c.primaryDark, light: c.primaryLight },
        navy: { DEFAULT: c.navy, light: c.navyLight },
        ink: '#0F172A',
        muted: '#475569',
        soft: '#F4F6FB',
      },
      fontFamily: { sans: ['Figtree', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 10px 30px -12px rgba(11,26,74,0.18)' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
}
