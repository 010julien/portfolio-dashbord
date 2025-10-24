/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1b9abe',
          dark: '#139cbc',
          light: '#9fd6e2',
          lighter: '#e9f7fe',
        },
        accent: '#f06641',
      },
    },
  },
  plugins: [],
}
