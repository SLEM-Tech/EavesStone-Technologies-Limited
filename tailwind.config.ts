import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",

				/* ========== Nestora Brand Foundation ========== */
				brand: {
					navy: "#0F1111", // Dark Hero background from image
					blue: "#003EB0", // Vivid blue from 'Buy' buttons and badges
					light: "#F3F7FF", // Light wash for hover states
				},

				background: "#FFFFFF",
				surface: "#FFFFFF",
				panel: "#F9FAFB", // Subtle light gray section backgrounds
				dark: "#000000",

				primary: {
					100: "#003EB0", // Matches brand.blue for HeroUI consistency
					200: "#003087",
					300: "#0F1111", // Matches brand.navy
					400: "#5855D6", // The Royal Purple used for Section Headers
					DEFAULT: "#003EB0",
				},

				gray: {
					50: "#F9FAFB",
					100: "#F3F4F6",
					200: "#E5E7EB", // Card border color from image
					300: "#D1D5DB",
					400: "#9CA3AF", // Muted metadata text
					500: "#6B7280",
					600: "#4B5563",
					700: "#374151",
					800: "#1F2937",
					900: "#111827", // Primary text color
				},

				success: {
					light: "#E6F9F0",
					DEFAULT: "#10B981",
					dark: "#059669",
				},
				danger: {
					light: "#FEF2F2",
					DEFAULT: "#EF4444",
					dark: "#DC2626",
				},

				accent: "#5855D6", // Map to the Heading Purple
				price: "#111827", // High contrast price color
				whatsapp: "#25D366",
			},

			animation: {
				"spin-slow": "spin 8s linear infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
		},
		screens: {
			xs: "400px",
			xmd: "800px",
			slg: "999px",
			...require("tailwindcss/defaultTheme").screens,
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#003EB0",
							foreground: "#FFFFFF",
						},
						focus: "#003EB0",
					},
				},
			},
		}),
	],
};
export default config;
