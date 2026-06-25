/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Emerald / Forest green
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Accent — Orange / Amber
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -2px rgba(16, 185, 129, 0.12)',
        glow: '0 0 40px -8px rgba(16, 185, 129, 0.45)',
        card: '0 10px 40px -12px rgba(0, 0, 0, 0.18)',
        'card-dark': '0 10px 40px -8px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
        'gradient-mesh':
          'radial-gradient(at 0% 0%, rgba(16,185,129,0.18) 0px, transparent 50%), radial-gradient(at 98% 1%, rgba(251,146,60,0.16) 0px, transparent 50%), radial-gradient(at 50% 99%, rgba(5,150,105,0.14) 0px, transparent 50%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(3deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.2,0.6,0.4,1) infinite',
      },
    },
  },
  plugins: [],
};
