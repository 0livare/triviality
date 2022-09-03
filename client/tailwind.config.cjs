/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'purp-400': '#c4b1ff',
        'purp-700': '#6856e1',
        'purp-900': '#4a3d89',
        'cyan-400': 'hsl(180deg 100% 94%)',
        'cyan-500': 'hsl(180deg 100% 84%)',
        'cyan-600': 'hsl(180deg 100% 74%)',
      },
    },
  },
  plugins: [],
}
