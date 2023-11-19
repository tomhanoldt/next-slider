/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    // colors: {
    //   gray: colors.coolGray,
    //   blue: colors.lightBlue,
    //   red: colors.rose,
    //   pink: colors.fuchsia,
    //   primary: colors.blue
    // },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
