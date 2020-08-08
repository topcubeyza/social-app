import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { LocalizationActions, LocalizationTypes } from "./LocalizationRedux"

import { getLanguageCode, setCurrentLocale } from "../index"

function* setLocale(action) {
    try {
        let {localeType} = action.payload;
        let code = getLanguageCode(localeType)

        // set the locale of the localization tool first, ex: I18n's locale
        setCurrentLocale(code)
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