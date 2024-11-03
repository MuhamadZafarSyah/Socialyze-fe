/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#88aaee",
        destrucive: "#ee8888",
        mainAccent: "#4d80e6",
        overlay: "rgba(0,0,0,0.8)",
        yellow: "#FDC203",
        bg: "#dfe5f2",
        text: "#000",
        border: "#000",
        darkBg: "#272933",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        light: "3px 3px 0px 0px #000",
        dark: "3px 3px 0px 0px #000",
      },
      translate: {
        boxShadowX: "3px",
        boxShadowY: "3px",
        reverseBoxShadowX: "-3px",
        reverseBoxShadowY: "-3px",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
