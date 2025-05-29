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
      keyframes: {
        modalEnter: {
          "0%": { opacity: "0", transform: "scale(0.95)" }, // Initial state
          "100%": { opacity: "1", transform: "scale(1)" }, // Final state
        },
      },
      animation: {
        // The 'forwards' keyword is crucial to keep the 100% state
        modalEnter: "modalEnter 0.3s ease-out forwards",
      },
    },
  },

  plugins: [],
};
