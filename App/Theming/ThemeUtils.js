import {Appearance} from "react-native-appearance"

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

let colors = lightThemeColors;
let images = lightThemeImages;

const getColorByName = colorName => colors[colorName]

const getImageByName = imageName => images[imageName]

// colorMode is either 'dark' or 'light',
// themeMode is 'dark', 'light', or 'device'
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

export const setThemeMode = themeMode => {
    let colorMode = getColorMode(themeMode);

    colors = Themes[colorMode].colors;
    images = Themes[colorMode].images;
}

export const themed = {
    color: getColorByName,
    image: getImageByName
}