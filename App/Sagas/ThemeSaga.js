import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { ThemeActions, ThemeTypes } from "../Redux/ThemeRedux"
import { getColorMode, setThemeMode } from "../Themes/Theme";

function* setTheme(action) {
    debugger;
    try {
        let {themeMode} = action.payload;
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