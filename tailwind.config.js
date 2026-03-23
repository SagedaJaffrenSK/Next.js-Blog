/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        mono: ['"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
          },
        },
      },
    },
  },
  plugins: [],
};
