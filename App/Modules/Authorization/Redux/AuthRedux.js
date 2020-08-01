import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const Types = {
    CREATE_USER_REQUEST: "auth/create_user_request",
    SIGN_IN_REQUEST: "auth/sign_in_request",
    SIGN_OUT_REQUEST: "auth/sign_out_request",
    AUTH_STATE_CHANGE: "auth/auth_state_change",
    SET_USER: "auth/set_user",
    SET_CANDIDATE_USER: "auth/set_candidate_user",
    RESEND_VERIFICATION_EMAIL_REQUEST: "auth/resend_verification_email_request",
    RESEND_VERIFICATION_EMAIL_SUCCESS: "auth/resend_verification_email_success",
    FAILURE: "auth/failure"
}

const Actions = {
    signInRequest: ({email, password}) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: {email, password}
    }),
    createUserRequest: ({email, password, displayName}) => ({
        type: Types.CREATE_USER_REQUEST,
        payload: {email, password, displayName}
    }),
    signOutRequest: () => ({
        type: Types.SIGN_OUT_REQUEST
    }),
    setUser: ({user}) => ({
        type: Types.SET_USER,
        payload: {user}
    }),
    authStateChange: ({state}) => ({
        type: Types.AUTH_STATE_CHANGE,
        payload: {state}
    }),
    setCandidateUser: ({user}) => ({
        type: Types.SET_CANDIDATE_USER,
        payload: {user}
    }),
    resendVerificationEmailRequest: () => ({
        type: Types.RESEND_VERIFICATION_EMAIL_REQUEST
    }),
    resendVerificationEmailSuccess: () => ({
        type: Types.RESEND_VERIFICATION_EMAIL_SUCCESS
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
    candidateUser: null,
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
        candidateUser: null,
        user
    }
}

export const resendVerificationEmailSuccess = (state, action) => {
    return {
        ...state,
        fetching: false,
        error: null
    }
}

export const setCandidateUser = (state, action) => {
    const {user} = action.payload
    return {
        ...state,
        candidateUser: user
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
    [Types.SET_USER]: success,
    [Types.FAILURE]: failure,
    [Types.SET_CANDIDATE_USER]: setCandidateUser,
    [Types.RESEND_VERIFICATION_EMAIL_REQUEST]: request,
    [Types.RESEND_VERIFICATION_EMAIL_SUCCESS]: resendVerificationEmailSuccess
})