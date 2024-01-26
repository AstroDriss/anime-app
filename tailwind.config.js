/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0D0D0D",
        darkGray: "#1A1A1A",
        light: "#FAFAFA",
        primary: "rgb(255 180 65 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
