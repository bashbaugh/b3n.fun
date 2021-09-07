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
        }
      },
      borderWidth: {
        1: '1px'
      },
      gridTemplateColumns: {
        'mil': 'repeat(1000000, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
