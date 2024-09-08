/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
  content: ["./public/build/**/*.{html,js}", "./src/js/**/*/*.{js}"],
  theme: {
    fontFamily: {
      pixely: ["Pixelify Sans", "sans-serif"],
      poppin: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "540px",
      },
      backgroundImage: {
        "section-1-bg": "url('/assets/Frame-32.png')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-animated"),
    require("daisyui"),
  ],
};
