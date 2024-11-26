import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    theme: {
      colors: {
        "bgcolor-white50": "rgba(255, 255, 255, 1)",
        "bgcolor-white100": "rgba(253, 253, 253, 1)",
        "bgcolor-white200": "rgba(253, 253, 253, 1)",
        "bgcolor-white300": "rgba(252, 252, 252, 1)",
        "bgcolor-white400": "rgba(251, 251, 251, 1)",
        "bgcolor-white500": "rgba(250, 250, 250, 1)",
        "bgcolor-white600": "rgba(228, 228, 228, 1)",
        "bgcolor-white700": "rgba(178, 178, 178, 1)",
        "bgcolor-white800": "rgba(138, 138, 138, 1)",
        "bgcolor-white900": "rgba(105, 105, 105, 1)",
        "primarycolor-violet50": "rgba(233, 233, 236, 1)",
        "primarycolor-violet100": "rgba(185, 186, 197, 1)",
        "primarycolor-violet200": "rgba(152, 152, 169, 1)",
        "primarycolor-violet300": "rgba(104, 106, 130, 1)",
        "primarycolor-violet400": "rgba(75, 77, 105, 1)",
        "primarycolor-violet500": "rgba(30, 32, 68, 1)",
        "primarycolor-violet600": "rgba(27, 29, 62, 1)",
        "primarycolor-violet700": "rgba(21, 23, 48, 1)",
        "primarycolor-violet800": "rgba(17, 18, 37, 1)",
        "primarycolor-violet900": "rgba(13, 13, 29, 1)",
        "secondarycolor-green50": "rgba(230, 250, 244, 1)",
        "secondarycolor-green100": "rgba(178, 238, 220, 1)",
        "secondarycolor-green200": "rgba(141, 230, 203, 1)",
        "secondarycolor-green300": "rgba(90, 218, 179, 1)",
        "secondarycolor-green400": "rgba(57, 211, 165, 1)",
        "secondarycolor-green500": "rgba(8, 200, 142, 1)",
        "secondarycolor-green600": "rgba(7, 182, 129, 1)",
        "secondarycolor-green700": "rgba(6, 142, 101, 1)",
        "secondarycolor-green800": "rgba(4, 110, 78, 1)",
        "secondarycolor-green900": "rgba(3, 84, 60, 1)",
        "sucess-green50": "rgba(234, 249, 238, 1)",
        "sucess-green100": "rgba(189, 235, 201, 1)",
        "sucess-green200": "rgba(157, 226, 175, 1)",
        "sucess-green300": "rgba(113, 212, 138, 1)",
        "sucess-green400": "rgba(85, 204, 115, 1)",
        "sucess-green500": "rgba(43, 191, 80, 1)",
        "sucess-green600": "rgba(39, 174, 73, 1)",
        "sucess-green700": "rgba(31, 136, 57, 1)",
        "sucess-green800": "rgba(24, 105, 44, 1)",
        "sucess-green900": "rgba(18, 80, 34, 1)",
        "danger-orange50": "rgba(249, 236, 236, 1)",
        "danger-orange100": "rgba(236, 195, 195, 1)",
        "danger-orange200": "rgba(227, 165, 165, 1)",
        "danger-orange300": "rgba(215, 124, 124, 1)",
        "danger-orange400": "rgba(207, 99, 99, 1)",
        "danger-orange500": "rgba(195, 60, 60, 1)",
        "danger-orange600": "rgba(177, 55, 55, 1)",
        "danger-orange700": "rgba(138, 43, 43, 1)",
        "danger-orange800": "rgba(107, 33, 33, 1)",
        "danger-orange900": "rgba(82, 25, 25, 1)",
        "information-blue50": "rgba(237, 237, 255, 1)",
        "information-blue100": "rgba(199, 198, 254, 1)",
        "information-blue200": "rgba(171, 170, 253, 1)",
        "information-blue300": "rgba(133, 131, 252, 1)",
        "information-blue400": "rgba(109, 107, 252, 1)",
        "information-blue500": "rgba(73, 70, 251, 1)",
        "information-blue600": "rgba(66, 64, 228, 1)",
        "information-blue700": "rgba(52, 50, 178, 1)",
        "information-blue800": "rgba(40, 39, 138, 1)",
        "information-blue900": "rgba(31, 29, 105, 1)",
        "white-white50": "rgba(255, 255, 255, 1)",
        "white-white100": "rgba(255, 255, 255, 1)",
        "white-white200": "rgba(255, 255, 255, 1)",
        "white-white300": "rgba(255, 255, 255, 1)",
        "white-white400": "rgba(255, 255, 255, 1)",
        "white-white500": "rgba(255, 255, 255, 1)",
        "white-white600": "rgba(232, 232, 232, 1)",
        "white-white700": "rgba(181, 181, 181, 1)",
        "white-white800": "rgba(140, 140, 140, 1)",
        "white-white900": "rgba(107, 107, 107, 1)",
        "black-black50": "rgba(230, 230, 230, 1)",
        "black-black100": "rgba(176, 176, 176, 1)",
        "black-black200": "rgba(138, 138, 138, 1)",
        "black-black300": "rgba(84, 84, 84, 1)",
        "black-black400": "rgba(51, 51, 51, 1)",
        "black-black500": "rgba(0, 0, 0, 1)",
        "black-black600": "rgba(0, 0, 0, 1)",
        "black-black700": "rgba(0, 0, 0, 1)",
        "black-black800": "rgba(0, 0, 0, 1)",
        "black-black900": "rgba(0, 0, 0, 1)"
      },
      fontSize: {
        "regular-h1--destaque-regular": "3.75rem",
        "regular-h2--head-regular": "2.5rem",
        "regular-h3--subhead-regular": "1.875rem",
        "regular-h4--title-regular": "1.5rem",
        "regular-h5--subtitle-regular": "1.25rem",
        "regular-h6--paragraph-regular": "1rem",
        "regular-lb--labels-regular": "0.75rem",
        "bold-h1--destaque-bold": "3.75rem",
        "bold-h2--head-bold": "2.5rem",
        "bold-h3--subhead-bold": "1.875rem",
        "bold-h4--title-bold": "1.5rem",
        "bold-h5--subtitle-bold": "1.25rem",
        "bold-h6--paragraph-bold": "1rem",
        "bold-lb--labels-bold": "0.75rem"
      },
      fontWeight: {
        "regular-h1--destaque-regular": "400",
        "regular-h2--head-regular": "400",
        "regular-h3--subhead-regular": "400",
        "regular-h4--title-regular": "400",
        "regular-h5--subtitle-regular": "400",
        "regular-h6--paragraph-regular": "400",
        "regular-lb--labels-regular": "400",
        "bold-h1--destaque-bold": "700",
        "bold-h2--head-bold": "600",
        "bold-h3--subhead-bold": "600",
        "bold-h4--title-bold": "600",
        "bold-h5--subtitle-bold": "600",
        "bold-h6--paragraph-bold": "500",
        "bold-lb--labels-bold": "500"
      },
      fontFamily: {
        manrope: "Manrope"
      }
    }
  },
  plugins: []
};
export default config;
