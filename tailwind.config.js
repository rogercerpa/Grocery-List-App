module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        "150px": "150px",
      },
      height: {
        "150px": "150px",
      },
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ["group-hover"],
      backgroundColor: ['active'],
      textColor: ['visited'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
