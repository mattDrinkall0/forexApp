/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      'navbg': '#121212',
      'bodybg': '#212121',
      'blue': '#2196f3',
      'lightbg': '#424242',
      'medbg': '#313131',
      'red': '#cc0000',
    },
    
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      inset: {
        '-5': '-1.25rem',
        '-10': '2.5rem',
        '-20': '-5rem'
       },

       typography: (theme) => ({
        DEFAULT: {
          css: {
            // ...other properties
            h2: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
