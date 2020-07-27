// leave off @2x/@3x

const imageFileLocation = "../Assets/Images/"
const animationFileLocation = "../Assets/Lottie/"

const constantImages = {
  splashTransparent: require(imageFileLocation + "splash-transparent.png"),
  underConstruction: require(imageFileLocation + "under-construction.png"),
  loadingAnimation: require(animationFileLocation + "loading.json")
}

export const lightThemeImages = {
  ...constantImages,
}

export const darkThemeImages = {
  ...constantImages,
}

const Images = {
  splashTransparent: "splashTransparent",
  underConstruction: "underConstruction",
  loadingAnimation: "loadingAnimation",
}

export default Images
