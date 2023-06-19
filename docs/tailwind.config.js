/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      fontFamily: {
        satoshiMedium: "Satoshi-Medium",
        satoshiBold: "Satoshi-Bold",
        satoshiBlack: "Satoshi-Black",
        ranadeLight: "Ranade-Light",
        ranadeLightItalic: "Ranade-LightItalic",
        ranadeRegular: "Ranade-Regular",
        ranadeItalic: "Ranade-Italic",
        ranadeMedium: "Ranade-Medium",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
