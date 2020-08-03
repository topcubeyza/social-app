import I18n from "react-native-i18n"

export const localized = {
    text: I18n.t
}

export const currentLocale = () => {
    return I18n.currentLocale().substring(0, 2)
}

export const setCurrentLocale = locale => {
    I18n.locale = locale
}