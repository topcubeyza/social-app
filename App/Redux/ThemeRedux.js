import { createReducer, createActions } from 'reduxsauce'
import { ThemeModes } from '../Themes/Colors'

/* ------------- Types and Action Creators ------------- */

const Types = {
    CHANGE_THEME: "theme/change_theme",
}

const Actions = {
    changeTheme: ({ themeMode, color }) => ({
        type: Types.CHANGE_THEME,
        payload: { themeMode, color }
    })
}

export const ThemeTypes = Types
export const ThemeActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    themeMode: ThemeModes.light,
    color: () => { }
}

/* ------------- Reducers ------------- */

export const changeTheme = (state, action) => {
    let { themeMode, color } = action.payload
    return {
        ...state,
        themeMode,
        color
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const ThemeReducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_THEME]: changeTheme
})