/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shade-1": "#2c2583",
      },
      fontFamily: {
        headerFonts: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
