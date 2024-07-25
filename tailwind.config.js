/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Скани всі HTML, JS, TS, JSX, TSX файли у папці src та всіх підпапках
    "./public/**/*.html", // Скани всі HTML файли у папці public та всіх підпапках
    "./components/**/*.{html,js,ts}", // Скани всі HTML, JS, TS файли у папці components та всіх підпапках
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
