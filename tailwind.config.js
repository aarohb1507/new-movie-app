/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': 'var(--background-image-hero-pattern)',
      },

      colors: {
        primary: '#1e40af', // Optional: keep or remove

        light: {
          // Allows classes like bg-light-100, text-light-100, etc.
          100: 'rgb(206 206 251)', // previously #cecefb
          200: 'rgb(168 181 219)', // previously #a8b5db
        },
        gray: {
          100: '#9ca4ab',
        },
        dark: {
          100: '#0f0d23',
        },
      },
    },
  },
  plugins: [],
}
