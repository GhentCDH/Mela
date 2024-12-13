const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');

const { join } = require('path');

// Source: https://styleguide.ugent.be/websites/basis-elementen.html

// TODO add ugent font
// TODO check all elements with styleguide

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  daisyui: {
    themes: [
      {
        ugent: {
          primary: '#1e64c8',
          secondary: '#e9f0fa',
          accent: '#202020',
          neutral: '#cccccc',
          'base-100': '#e9f0fa',
          // 'base-100': '#2020',
          info: '#0096ff',
          success: '#3ede49',
          warning: '#ffd200',
          error: '#d0001c',

          '--rounded-box': '0rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0rem', // border radius of tabs
        },
      },
    ],
  },
  theme: {
    extend: {
      color: {
        corporate: '#1e64c8',
        'corporate-light': '#e9f0fa',
        text: '#202020',
        border: '#CCCCCC',
        'border-light': '#DDDDDD',
        yellow: '#FFD200',
        'yellow-light': '#FFFAE5',
        date: '#646464',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
