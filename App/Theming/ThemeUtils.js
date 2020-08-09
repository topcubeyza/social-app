import { Appearance } from "react-native-appearance"

import { lightThemeColors, darkThemeColors } from "./Colors"
import { lightThemeImages, darkThemeImages } from "./Images"

export const ThemeModes = {
    dark: 'dark',
    light: 'light',
    device: 'device'
}

const Themes = {
    light: {
        colors: lightThemeColors,
        images: lightThemeImages
    },
    dark: {
        colors: darkThemeColors,
        images: darkThemeImages
    }
}

// These two variables hold the app's global themed lists of colors and images
let colors = lightThemeColors;
let images = lightThemeImages;


/**
 * Returns the color value of a color name, based on the theme of the app
 * @param colorName - the name of the color, use the object 'Colors' to get a list of color names.
 * @returns color (String) 
 */
const getColorByName = colorName => colors[colorName]

/**
 * Returns the image source of an image name, based on the theme of the app
 * @param imageName - the name of the image, use the object Images to get a list of image names.
 * @returns image source
 */
const getImageByName = imageName => images[imageName]

// colorMode is either 'dark' or 'light',
// themeMode is 'dark', 'light', or 'device'
/**
 * Returns the color mode ('dark' or 'light') if theme mode is not device.
 * If theme mode is device, gets the device color mode and returns that.
 * @param {String} themeMode - 'dark', 'light', or 'device'
 * @returns colorMode - 'dark', 'light'
 */
export const getColorMode = (themeMode) => {
    let colorMode = themeMode;
    if (themeMode == ThemeModes.device) {
        colorMode = Appearance.getColorScheme();
        if (colorMode != ThemeModes.dark && colorMode != ThemeModes.light) {
            colorMode = ThemeModes.light
        }
    }

    return colorMode;
}

/**
 * Sets the list of colors and images to the corresponding color or image list.
 * i.e. darkThemeColors & darkThemeImages or lightThemeColors & lightThemeImages
 * @param {String} locale - en or tr 
 */
export const setThemeMode = themeMode => {
    let colorMode = getColorMode(themeMode);

    colors = Themes[colorMode].colors;
    images = Themes[colorMode].images;
}

/**
 * A convenience object that has two properties that each hold a function to get the themed color or image.
 */
export const themed = {
    /**
     * Returns the color value of a color name, based on the theme of the app
     * @param colorName - the name of the color, use the object 'Colors' to get a list of color names.
     * @returns color (String) 
     */
    color: getColorByName,
    /**
     * Returns the image source of an image name, based on the theme of the app
     * @param imageName - the name of the image, use the object Images to get a list of image names.
     * @returns image source
     */
    image: getImageByName
}