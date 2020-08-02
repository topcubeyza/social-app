import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import I18n from "react-native-i18n"

import { LocalizationActions, LocalizationTypes } from "../Redux/LocalizationRedux"

import { getLanguageCode } from "../I18n/Utils"

function* setLocale(action) {
    try {
        let {localeType} = action.payload;
        let code = getLanguageCode(localeType)

        I18n.locale = code
        yield put(LocalizationActions.changeLocale({
            localeType
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