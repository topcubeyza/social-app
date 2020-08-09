
import { getLocales } from "react-native-localize"
import I18n from "react-native-i18n"
import { LocaleTypes } from "./index";

/**
 * @returns languageCode of the device
 */
export const getDeviceLocale = () => {
    let locales = getLocales();
    if (locales.length > 0) {
        return locales[0].languageCode;
    }

    return LocaleTypes.english;
}

/**
 * Returns the language code ('en' or 'tr') if locale type is not device.
 * If locale type is device, gets the device language code and returns that.
 * @param {String} localeType - 'en', 'tr', or 'device'
 * @returns languageCode - 'en', 'tr'
 */
export const getLanguageCode = localeType => {
    let code = localeType;
    if (localeType == LocaleTypes.device) {
        code = getDeviceLocale();
    }

    return code;
}

/**
 * Object used all around to app to abstract the Localization Tool, ex: I18n
 */
export const localized = {
    /**
     * Translates text
     * @param {String} name - Name of the text, use Texts
     * @param {Object} options - Parameters used in translation. Usage: {name: "John"}
     * @returns translated text
     */
    text: (name, options) => I18n.t(name, options)
}

/**
 * @returns the locale of the Localization Tool, ex. en or tr
 */
export const getCurrentLocale = () => {
    return I18n.currentLocale().substring(0, 2)
}

/**
 * Sets the locale of the Localization Tool
 * @param {String} locale - en or tr 
 */
export const setCurrentLocale = locale => {
    I18n.locale = locale
}