
import { getLocales } from "react-native-localize"
import I18n from "react-native-i18n"
import { LocaleTypes } from "./index";

export const getDeviceLocale = () => {
    let locales = getLocales();
    if (locales.length > 0) {
        return locales[0].languageCode;
    }

    return LocaleTypes.english;
}

export const getLanguageCode = localeType => {
    let code = localeType;
    if (localeType == LocaleTypes.device) {
        code = getDeviceLocale();
    }

    return code;
}

export const localized = {
    text: (name, options) => I18n.t(name, options)
}

export const getCurrentLocale = () => {
    return I18n.currentLocale().substring(0, 2)
}

export const setCurrentLocale = locale => {
    I18n.locale = locale
}