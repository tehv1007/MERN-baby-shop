/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner:
          "url(https://cdn.shopify.com/s/files/1/0623/7578/8783/files/1.jpg?v=1644313672)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
