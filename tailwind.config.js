const colors = require('tailwindcss/colors')

// Credit: https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
const systemFonts = [
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
]
const fallbackFonts = ['Helvetica Neue', 'sans-serif']
const sansFallbackFonts = [...systemFonts, ...fallbackFonts]
const { sansFont, monoFont } = {
  sansFont: ['IBM Plex Sans', ...sansFallbackFonts],
  monoFont: ['Consolas', 'monospace'],
}

module.exports = {
  plugins: [require('daisyui')],
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx,js,jsx}', './index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: sansFont,
      mono: monoFont,
    },
    extend: {
      colors: {
        gray: colors.trueGray,
        primary: '#B1E55A',
      },
      boxShadow: {
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      // margin: {
      //   '96': '24rem',
      //   '128': '32rem',
      // },
    },
  },
}
