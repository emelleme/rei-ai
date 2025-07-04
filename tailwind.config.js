
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        separator: '#F5F5F5',
      },
      fontFamily: {
        'poppins-light': ['Poppins_300Light'],
        'poppins-regular': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
      },
      spacing: {
        '6': '24px', // 6 * 4px = 24px for generous padding
      }
    },
  },
  plugins: [],
}
