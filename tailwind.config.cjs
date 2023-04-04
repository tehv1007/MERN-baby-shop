/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        navbar: "var(--navbar-height)",
        banner: "var(--banner-height)",
      },
    },
  },
  plugins: [require("daisyui")],
};
