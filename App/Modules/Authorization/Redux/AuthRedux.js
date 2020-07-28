import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const Types = {
    SIGN_IN_REQUEST: "auth/sign_in_request",
    SEND_LINK_REQUEST: "auth/send_link_request",
    SEND_LINK_SUCCESS: "auth/send_link_success",
    SIGN_OUT_REQUEST: "auth/sign_out_request",
    AUTH_STATE_CHANGE: "auth/auth_state_change",
    CANDIDATE_EMAIL: "auth/candidate_email",
    FAILURE: "auth/failure"
}

const Actions = {
    signInRequest: ({email, password}) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: {email, password}
    }),
    sendLinkRequest: ({email}) => ({
        type: Types.SEND_LINK_REQUEST,
        payload: {email}
    }),
    sendLinkSuccess: () => ({
        type: Types.SEND_LINK_SUCCESS,
    }),
    signOutRequest: () => ({
        type: Types.SIGN_OUT_REQUEST
    }),
    authStateChange: ({user}) => ({
        type: Types.AUTH_STATE_CHANGE,
        payload: {user}
    }),
    candidateEmail: ({email}) => ({
        type: Types.CANDIDATE_EMAIL,
        payload: {email}
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
    candidateEmail: null,
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
        fetching: true,
        error: null
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

export const sendLinkSuccess = (state, action) => {
    return {
        ...state,
        fetching: false
    }
}

export const candidateEmail = (state, action) => {
    const {email} = action.payload
    return {
        ...state,
        candidateEmail: email
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
    [Types.SEND_LINK_REQUEST]: request,
    [Types.SIGN_OUT_REQUEST]: request,
    [Types.AUTH_STATE_CHANGE]: success,
    [Types.FAILURE]: failure,
    [Types.CANDIDATE_EMAIL]: candidateEmail
})