/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "hover-background":
          "radial-gradient( rgba(255,255,255, 0.5) , transparent , transparent)",
      },
    },
  },
  plugins: [],
};
