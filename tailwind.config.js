/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      awesome: ['"Font Awesome 5 Free"', "sans"],
    },

    extend: {
      colors: {
        primary: "#9CA8F8", // Primary accent color
        secondary: "#CDFCF6", // Secondary accent color
        darkBg: "#343541", // Background color for dark themes
        lightBg: "#FAF7F0",
        darkAccent: "#202123",
        lightAccent: "#ffffff",
        darkText:"#ffffff",
        lightText:"#000000",
      },
    },
  },
  plugins: [],
};
