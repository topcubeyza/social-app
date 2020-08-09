// leave off @2x/@3x

const imageFileLocation = "../Assets/Images/"
const animationFileLocation = "../Assets/Lottie/"

const constantImages = {
  splashTransparent: require(imageFileLocation + "splash-transparent.png"),
  underConstruction: require(imageFileLocation + "under-construction.png"),
  loadingAnimation: require(animationFileLocation + "loading.json"),
  leftArrow: require(imageFileLocation + "left-arrow.png"),
  logoOrange: require(imageFileLocation + "logo-orange.png"),
}

export const lightThemeImages = {
  ...constantImages,
}

export const darkThemeImages = {
  ...constantImages,
}

/**
 * The names of all the images used in the app.
 * Provides ease of use with the help of intellisense.
 * Lowers the possibility of typos.
 */
const Images = {
  splashTransparent: "splashTransparent",
  underConstruction: "underConstruction",
  loadingAnimation: "loadingAnimation",
  leftArrow: "leftArrow",
  logoOrange: "logoOrange",
}

export default Images
