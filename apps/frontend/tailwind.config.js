const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');

const sharedTailwindConfig = require('../../libs/ui/src/tailwind.config');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['emerald'],
  },
  plugins: [
     
    require('@tailwindcss/typography'),
     
    require('daisyui'),
  ],
};
