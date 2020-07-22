import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const Types = {
    SIGN_IN_REQUEST: "auth/sign_in_request",
    CREATE_USER_REQUEST: "auth/create_user_request",
    SIGN_OUT_REQUEST: "auth/sign_out_request",
    AUTH_STATE_CHANGE: "auth/auth_state_change",
    FAILURE: "auth/failure"
}

const Actions = {
    signInRequest: ({email, password}) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: {email, password}
    }),
    createUserRequest: ({email, password}) => ({
        type: Types.CREATE_USER_REQUEST,
        payload: {email, password}
    }),
    signOutRequest: () => ({
        type: Types.SIGN_OUT_REQUEST
    }),
    authStateChange: ({user}) => ({
        type: Types.AUTH_STATE_CHANGE,
        payload: {user}
    }),
    failure: ({error}) => ({
        type: Types.FAILURE,
        payload: {error}
    })
}

export const AuthTypes = Types
export const AuthActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    user: null,
    fetching: null,
    error: null
}

/* ------------- Selectors ------------- */

export const AuthSelectors = {
    selectUser: state => state.auth.user
}

/* ------------- Reducers ------------- */

export const request = (state, action) => {
    return {
        ...state,
        fetching: true
    }
}

export const success = (state, action) => {
    const { user } = action.payload
    return {
        ...state,
        fetching: false,
        error: null,
        user
    }
}

export const failure = (state, action) => {
    const { error } = action.payload
    return {
        ...state,
        fetching: false,
        error
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const AuthReducer = createReducer(INITIAL_STATE, {
    [Types.SIGN_IN_REQUEST]: request,
    [Types.CREATE_USER_REQUEST]: request,
    [Types.SIGN_OUT_REQUEST]: request,
    [Types.AUTH_STATE_CHANGE]: success,
    [Types.FAILURE]: failure
})