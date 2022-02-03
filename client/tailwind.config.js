module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "header-font": ["Great Vibes"],
      },
      backgroundImage: {
        "login-signup-bkg": "url('./assets/images/cartagena_bkg.jpg')",
        "home-bkg": "url('./assets/images/cartagena_bkg1.jpg')",
        "landing-bkg": "url('./assets/images/landing_page.jpg')",
      },
      colors: {
        pergamino: "#e6d7bd",
        "pearl-white": "#eeebd9",
      },
    },
  },
  plugins: [],
};
