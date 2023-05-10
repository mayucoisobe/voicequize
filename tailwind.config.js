/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '426px',
      sm: '640px',
      md: '768px',
    },
    extend: {
      colors: {
        customBlue: '#3E87FF',
        customYellow: '#FFD166',
        customRed: '#EF476F',
        customGreen: '#06D6A0',
        customBlack: '#33312E',
      },
      animation: {
        'jello-horizontal': 'jello-horizontal .7s ease   both',
        'scale-in-center': 'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'flip-in-ver-right': 'flip-in-ver-right .8s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'up-down': 'up-down 1.5s ease infinite both',
      },
      keyframes: {
        'jello-horizontal': {
          '0%,to': {
            transform: 'scale3d(1, 1, 1)',
          },
          '30%': {
            transform: 'scale3d(1.25, .75, 1)',
          },
          '40%': {
            transform: 'scale3d(.75, 1.25, 1)',
          },
          '50%': {
            transform: 'scale3d(1.15, .85, 1)',
          },
          '65%': {
            transform: 'scale3d(.95, 1.05, 1)',
          },
          '75%': {
            transform: 'scale3d(1.05, .95, 1)',
            opacity: '1',
          },
          '80%': {
            opacity: '.7',
          },
          '90%': {
            opacity: '.4',
          },
          to: {
            transform: 'scale3d(1, 1, 1)',
            opacity: '0',
          },
        },
        'scale-in-center': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          to: {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'flip-in-ver-right': {
          '0%': {
            transform: 'rotateY(-80deg)',
            opacity: '0',
          },
          to: {
            transform: 'rotateY(0)',
            opacity: '1',
          },
        },
        'up-down': {
          '0%': {
            transform: 'rotate(-25deg) translateY(0)',
            'animation-timing-function': 'ease-out',
          },
          '20%': {
            transform: 'rotate(-25deg) translateY(-15px)',
            'animation-timing-function': 'ease-in',
          },
          '40%': {
            transform: 'rotate(-25deg) translateY(0)',
            'animation-timing-function': 'ease-out',
          },
          '60%': {
            transform: 'rotate(-25deg) translateY(-15px)',
            'animation-timing-function': 'ease-in',
          },
          '100%': {
            transform: 'rotate(-25deg) translateY(0)',
            'animation-timing-function': 'ease-out',
          },
        },
      },
    },
  },
  plugins: [],
};
