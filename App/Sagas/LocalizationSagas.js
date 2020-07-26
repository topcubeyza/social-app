import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { LocalizationActions, LocalizationTypes } from "../Redux/LocalizationRedux"
import { LanguageCodes } from "../I18n/languages/Names";
import { Platform, NativeModules } from "react-native";
import I18n from "react-native-i18n"

getDeviceLocale = () => {
    let locale;
    // iOS:
    if (Platform.OS == "ios") {
        locale = NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
    }
    else {
        locale = NativeModules.I18nManager.localeIdentifier
    }

    return locale.substring(0,2);
}

function* setLocale(action) {
    try {
        let {languageCode} = action.payload;
        let code = languageCode;
        if (languageCode == LanguageCodes.device) {
            code = getDeviceLocale();
        }

        I18n.locale = code
        yield put(LocalizationActions.changeLocale({
            languageCode: code
        }))
    } catch (error) {

    }
}

function* watchSetLocale() {
    yield takeEvery(LocalizationTypes.CHANGE_LOCALE_REQUEST, setLocale)
}

const localizationSagas =  [
    fork(watchSetLocale),
]

export default localizationSagas;