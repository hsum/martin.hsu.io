module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
	'color_30': '#006EFF',
        'color_60': '#DAE8E7',
        'color_10': '#378582',
        'text_dark': '#274767',
        'text_light': '#4B9AE8',
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
