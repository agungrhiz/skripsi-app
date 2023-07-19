/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      animation: {
        cube: 'cube 12s ease-in forwards infinite',
        gradient: 'animated-gradient 15s ease infinite',
        'spin-slow': 'spin 5s linear infinite',
      },
      backgroundImage: {
        'gradient-linear': 'linear-gradient(132deg, #d3374c, #421492, #1b1d2d)',
        kawung: 'url("/img/kawung.png")',
      },
      backgroundSize: {
        '10px': '10px 10px',
        '400%': '400% 400%',
      },
      keyframes: {
        'animated-gradient': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        cube: {
          from: {
            transform: 'scale(0) rotate(0deg) translate(-50%, -50%)',
            opacity: 1,
          },
          to: {
            transform: 'scale(20) rotate(960deg) translate(-50%, -50%)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
}