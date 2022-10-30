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
				// primary: "#e681e4",
				primary: {"100":"#ab5266","200":"#e496a7","300":"#fcdbe3"},
				// secondary: {"100":"#ab5266","200":"#e496a7","300":"#fcdbe3"},
			}
		},
		container: {
			center: true,
			padding: "1rem",
		},
  },
    plugins: [],
}