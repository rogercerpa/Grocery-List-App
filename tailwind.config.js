module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "150px": "150px",
      },
      height: {
        "150px": "150px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
