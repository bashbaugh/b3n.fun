module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './projects/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        site: {
          primary: '#FA953C'
        },
        music: {
          spotify: '#1DB954'
        },
        bg: {
          brown: '#F5F2ED'
        }
      },
      borderWidth: {
        1: '1px'
      },
      gridTemplateColumns: {
        'mil': 'repeat(1000000, minmax(0, 1fr))'
      },
      keyframes: {
        'vibrate': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      },
      animation: {
        'vibrate': 'vibrate 0.3s linear infinite both'
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
