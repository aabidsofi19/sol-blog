const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const flowbite = require("flowbite/plugin");

module.exports = {
  theme: {
    extend: {},
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
