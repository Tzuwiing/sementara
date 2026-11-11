/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        arcade: {
          black: '#050505',
          magenta: '#ff007f',
          cyan: '#00f0ff',
          yellow: '#ffe600',
          green: '#39ff14',
          purple: '#1a0033',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        silk: ['Silkscreen', '"Press Start 2P"', 'monospace'],
        retro: ['VT323', 'monospace'],
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: 1 }, '50%, 100%': { opacity: 0 } },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        floaty: 'floaty 3s steps(6) infinite',
      },
    },
  },
  plugins: [],
}
