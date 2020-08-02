import { createReducer, createActions } from 'reduxsauce'
import { LocaleTypes } from '../I18n/languages/Names'

/* ------------- Types and Action Creators ------------- */

const Types = {
    CHANGE_LOCALE_REQUEST: "locale/change_locale_request",
    CHANGE_LOCALE: "locale/change_locale",
}

const Actions = {
    changeLocaleRequest: ({ localeType }) => {
        return ({
            type: Types.CHANGE_LOCALE_REQUEST,
            payload: { localeType }
        })
    },
    changeLocale: ({ localeType }) => {
        return ({
            type: Types.CHANGE_LOCALE,
            payload: { localeType }
        })
    },
}

export const LocalizationTypes = Types
export const LocalizationActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    localeType: "",
}

/* ------------- Reducers ------------- */

export const changeLocale = (state, action) => {
    let { localeType } = action.payload
    return {
        ...state,
        localeType,
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const LocalizationReducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LOCALE]: changeLocale,
})