/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xl: "1690px",
      l: "1400px",
      m: "900px",
      s: "670px",
      xs: "0px",
    },
  },
  plugins: [],
};
