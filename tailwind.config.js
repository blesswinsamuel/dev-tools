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
const { sansFont } = {
  sansFont: ['IBM Plex Sans', ...sansFallbackFonts],
}

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}', './index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: sansFont,
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
  variants: {
    extend: {
      // backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      backgroundOpacity: ['dark'],
      boxShadow: ['responsive', 'hover', 'focus', 'group-hover'],
      opacity: ['responsive', 'hover', 'group-hover', 'dark'],
    },
  },
  plugins: [],
}
