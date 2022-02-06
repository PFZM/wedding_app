module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "9v": "9vh",
        "10v": "10vh",
        "19v": "19vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "59v": "59vh",
        "60v": "60vh",
        "63v": "63vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
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
