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
  googleColor: "#D9534E",
  brandColor: "#FC8B2A",
  textOnBrandColor: greyColors.white,
  textOnLightBackground: greyColors.darkGrey,
  textOnDarkBackground: greyColors.white,
  lightBackground: greyColors.white,
  darkBackground: greyColors.darkGrey
}

const lightModeColors = {
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
  darkBackground_dm: constantColors.darkBackground
}

const darkModeColors = {
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
  darkBackground_dm: constantColors.lightBackground
}


export default AppConfig.darkMode ? darkModeColors : lightModeColors;
