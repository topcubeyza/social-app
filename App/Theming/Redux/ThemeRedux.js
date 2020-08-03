import { createReducer, createActions } from 'reduxsauce'
import { ThemeModes } from '../index'

/* ------------- Types and Action Creators ------------- */

const Types = {
    CHANGE_THEME_REQUEST: "theme/change_theme_request",
    CHANGE_THEME: "theme/change_theme",
}

const Actions = {
    changeThemeRequest: ({ themeMode }) => ({
        type: Types.CHANGE_THEME_REQUEST,
        payload: { themeMode }
    }),
    changeTheme: ({ themeMode }) => ({
        type: Types.CHANGE_THEME,
        payload: { themeMode }
    })
}

export const ThemeTypes = Types
export const ThemeActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    themeMode: "",
}

/* ------------- Reducers ------------- */

export const changeTheme = (state, action) => {
    let { themeMode } = action.payload
    return {
        ...state,
        themeMode
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const ThemeReducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_THEME]: changeTheme
})