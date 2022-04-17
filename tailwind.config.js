const plugin = require("tailwindcss/plugin");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				custom: "2px 4px 17px 1px",
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				".less-scrollbar::-webkit-scrollbar": {
					width: "10px",
					"background-color": "#aaa",
				},
				".less-scrollbar::-webkit-scrollbar-thumb": {
					width: "10px",
					"background-color": "#4f00ff",
					"border-radius": "100px",
				},
				".less-scrollbar": {
					width: "100%",
					"scrollbar-width": "thin" /* Firefox */,
					"scroll-behaviour": "smooth",
				},
				// ".less-scrollbar::-webkit-scrollbar-track": {
				// 	width: "1px",
				// },
				// ".less-scrollbar": {
				// 	"-ms-overflow-style": "none" /* IE and Edge */,
				// 	"scrollbar-width": "10px" /* Firefox */,
				// },
			});
		}),
	],
};
