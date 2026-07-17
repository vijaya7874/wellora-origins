/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1c3a2a',
          deep: '#122619',
          ink: '#0e1c13',
        },
        moss: '#3f6b4f',
        leaf: '#6ea877',
        sprout: '#9ec49a',
        cream: '#faf7ef',
        parchment: '#f3eee1',
        sand: '#e9e2cf',
        honey: '#d9a441',
        clay: '#c56b45',
      },
      fontFamily: {
        'serif-brand': ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
