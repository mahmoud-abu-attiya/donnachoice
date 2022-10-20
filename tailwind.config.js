/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				primary: "#e681e4",
				// secondary: "#d6a55f",
			}
		},
		container: {
			center: true,
			padding: "1rem",
		},
  },
    plugins: [],
}