import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { ThemeActions, ThemeTypes } from "./ThemeRedux"
import { getColorMode, setThemeMode } from "..";

function* setTheme(action) {
    try {
        let {themeMode} = action.payload;

        // set the value of the global theme mode first
        setThemeMode(themeMode)
        yield put(ThemeActions.changeTheme({
            themeMode
        }))
    } catch (error) {

    }
}

function* watchSetTheme() {
    yield takeEvery(ThemeTypes.CHANGE_THEME_REQUEST, setTheme)
}

const themeSagas =  [
    fork(watchSetTheme),
]

export default themeSagas;