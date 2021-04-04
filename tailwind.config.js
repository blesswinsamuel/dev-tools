// Credit: https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
const systemFonts = [
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
]
const fallbackFonts = ['Helvetica Neue', 'sans-serif']
const headerFont = 'Oswald'
const headerFallbackFonts = [...systemFonts, ...fallbackFonts]
const bodyFont = 'Lato'
const bodyFallbackFonts = [...systemFonts, ...fallbackFonts]

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}', './index.html'],
  theme: {
    fontFamily: {
      display: [headerFont, ...headerFallbackFonts],
      body: [bodyFont, ...bodyFallbackFonts],
    },
    extend: {
      colors: {
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
    // backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    boxShadow: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'group-hover'],
  },
  plugins: [],
}
