/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundLight: "#ffffff",
        backgroundDark: "#0f172a",
        foregroundLight: "#000000",
        foregroundDark: "#f1f5f9",
        primaryLight: "#2563eb",
        primaryDark: "#3b82f6",
        secondaryLight: "#f97316",
        secondaryDark: "#fb923c",
      },
    },
  },
  plugins: [],
}
