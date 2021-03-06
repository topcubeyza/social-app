import AppConfig from "../Config/AppConfig"

const greyColors = {
  white: "white",
  lightGrey: "#EDEDED",
  midLightGrey: "#AAAAAA",
  midGrey: "#707070",
  midDarkGrey: "#404040",
  darkGrey: "#333333",
  black: "black",
}

const constantColors = {
  ...greyColors,
  githubColor: "#211F1F",
  linkedinColor: "#0e76a8",
  googleColor: "#D9534E",
  brandColor: "#FC8B2A",
  textOnBrandColor: greyColors.white,
  textOnLightBackground: greyColors.darkGrey,
  textOnDarkBackground: greyColors.white,
  lightBackground: greyColors.white,
  darkBackground: greyColors.darkGrey
}

// colors used when the app is in light mode
export const lightThemeColors = {
  ...constantColors,
  white_dm: constantColors.white,
  lightGrey_dm: constantColors.lightGrey,
  midLightGrey_dm: constantColors.midLightGrey,
  midGrey_dm: constantColors.midGrey,
  midDarkGrey_dm: constantColors.midDarkGrey,
  darkGrey_dm: constantColors.darkGrey,
  black_dm: constantColors.black,
  textOnLightBackground_dm: constantColors.textOnLightBackground,
  textOnDarkBackground_dm: constantColors.textOnDarkBackground,
  lightBackground_dm: constantColors.lightBackground,
  darkBackground_dm: constantColors.darkBackground,
  overlayColor: "rgba(0,0,0,0.5)",
  lightOverlayColor: "rgba(0,0,0,0.4)",
}

// colors used when the app is in dark mode
export const darkThemeColors = {
  ...constantColors,
  white_dm: constantColors.darkGrey,
  lightGrey_dm: constantColors.midDarkGrey,
  midLightGrey_dm: constantColors.midGrey,
  midGrey_dm: constantColors.midLightGrey,
  midDarkGrey_dm: constantColors.lightGrey,
  darkGrey_dm: constantColors.white,
  black_dm: constantColors.white,
  textOnLightBackground_dm: constantColors.textOnDarkBackground,
  textOnDarkBackground_dm: constantColors.textOnLightBackground,
  lightBackground_dm: constantColors.darkBackground,
  darkBackground_dm: constantColors.lightBackground,
  overlayColor: "rgba(255,255,255,0.25)",
  lightOverlayColor: "rgba(255,255,255,0.2)",

}

/**
 * The names of all the colors used in the app.
 * Provides ease of use with the help of intellisense.
 * Lowers the possibility of typos.
 * _dm suffix implies that this color changes when the theme of the app changes
 */
export default Colors = {
  white: "white",
  lightGrey: "lightGrey",
  midLightGrey: "midLightGrey",
  midGrey: "midGrey",
  midDarkGrey: "midDarkGrey",
  darkGrey: "darkGrey",
  black: "black",
  githubColor: "githubColor",
  linkedinColor: "linkedinColor",
  googleColor: "googleColor",
  brandColor: "brandColor",
  textOnBrandColor: "textOnBrandColor",
  textOnLightBackground: "textOnLightBackground",
  textOnDarkBackground: "textOnDarkBackground",
  lightBackground: "lightBackground",
  darkBackground: "darkBackground",
  white_dm: "white_dm",
  lightGrey_dm: "lightGrey_dm",
  midLightGrey_dm: "midLightGrey_dm",
  midGrey_dm: "midGrey_dm",
  midDarkGrey_dm: "midDarkGrey_dm",
  darkGrey_dm: "darkGrey_dm",
  black_dm: "black_dm",
  textOnLightBackground_dm: "textOnLightBackground_dm",
  textOnDarkBackground_dm: "textOnDarkBackground_dm",
  lightBackground_dm: "lightBackground_dm",
  darkBackground_dm: "darkBackground_dm",
  overlayColor: "overlayColor",
  lightOverlayColor: "lightOverlayColor",
}
