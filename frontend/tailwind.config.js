/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        success: '#10B981',
      },
      screens: {
        'mobile': { 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
      },
    },
  },
  plugins: [],
}
