const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const flowbite = require("flowbite/plugin");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", "Helvetica", "Arial", "sans-serif"],
        poppins: ["Karla", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#05386B",
        secondary: "#379683",
        accent: "#5cdB95",
        "accent-light": "#8EE4AF",
        light: "#edf5e1",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [typography, forms, flowbite],
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "ui/*.{vue,js,ts,jsx,tsx}",
    "../../node_modules/flowbite/**/*.js",
    "../../node_modules/ui/*.{vue,js,ts,jsx,tsx}",
  ],
};
