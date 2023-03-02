/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {
      colors: {
        'QueenRed' : '#b90d31'
      }
    }
  },
  plugins: [],
  // plugins: [require('flowbite/plugin')],
}
