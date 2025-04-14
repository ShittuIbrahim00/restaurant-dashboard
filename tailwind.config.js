/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["Cormorant Infant", "serif"],
        merienda: ["Merienda", "cursive"],
        openSans: ["Open Sans", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        customColor: "#F9F4F0",
      },
    },
  },
  plugins: [],
};
