/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ss: "320px",
        xx: "375px",
        xs: "425px",
      },
    },
    gridTemplateColumns: {
      "fit-huge": "repeat(auto-fit, minmax(400px, 1fr))",
      "fit-big": "repeat(auto-fit, minmax(315px, 1fr))",
      "fit-medium": "repeat(auto-fit, minmax(257px, 1fr))",
      "fit-small": "repeat(auto-fit, minmax(157.5px, 1fr))",
      "fit-tiny": "repeat(auto-fit, minmax(130px, 1fr))",
      "fill-huge": "repeat(auto-fill, minmax(400px, 1fr))",
      "fill-big": "repeat(auto-fill, minmax(315px, 1fr))",
      "fill-medium": "repeat(auto-fill, minmax(257px, 1fr))",
      "fill-small": "repeat(auto-fill, minmax(157.5px, 1fr))",
      "fill-tiny": "repeat(auto-fill, minmax(130px, 1fr))",
    },
  },
  plugins: [],
};
