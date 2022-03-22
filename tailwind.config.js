// eslint-disable-next-line @typescript-eslint/no-var-requires
const { colors: defaultColors } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...defaultColors,
      beauty: {
        600: "#6200ee",
        500: "#8822FF",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
};
