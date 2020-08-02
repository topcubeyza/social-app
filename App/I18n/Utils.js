
import { getLocales } from "react-native-localize"
import { LocaleTypes } from "../I18n/languages/Names";

export const getDeviceLocale = () => {
    let locales = getLocales();
    if (locales.length > 0) {
        return locales[0].languageCode;
    }

    return LanguageCodes.english;
}

export const getLanguageCode = localeType => {
    let code = localeType;
    if (localeType == LocaleTypes.device) {
        code = getDeviceLocale();
    }

    return code;
}