import { createReducer, createActions } from 'reduxsauce'
import { LanguageCodes } from '../I18n/languages/Names'

/* ------------- Types and Action Creators ------------- */

const Types = {
    CHANGE_LOCALE_REQUEST: "locale/change_locale_request",
    CHANGE_LOCALE: "locale/change_locale",
}

const Actions = {
    changeLocaleRequest: ({ languageCode }) => {
        return ({
            type: Types.CHANGE_LOCALE_REQUEST,
            payload: { languageCode }
        })
    },
    changeLocale: ({ languageCode }) => {
        return ({
            type: Types.CHANGE_LOCALE,
            payload: { languageCode }
        })
    },
}

export const LocalizationTypes = Types
export const LocalizationActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    languageCode: "",
}

/* ------------- Reducers ------------- */

export const changeLocale = (state, action) => {
    let { languageCode } = action.payload
    return {
        ...state,
        languageCode,
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const LocalizationReducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LOCALE]: changeLocale,
})