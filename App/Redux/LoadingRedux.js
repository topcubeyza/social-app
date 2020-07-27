import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const Types = {
    SET_LOADING_MODE: "loading/set_loading_mode",
}

const Actions = {
    setLoadingMode: (isLoading) => ({
        type: Types.SET_LOADING_MODE,
        payload: { isLoading }
    }),
}

export const LoadingTypes = Types
export const LoadingActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    isLoading: false,
}

/* ------------- Reducers ------------- */

export const setLoadingMode = (state, action) => {
    let { isLoading } = action.payload
    return {
        ...state,
        isLoading
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const LoadingReducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOADING_MODE]: setLoadingMode
})