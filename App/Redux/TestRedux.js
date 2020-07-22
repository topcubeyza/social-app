import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersRequest: null,
  usersSuccess: ['items'],
  usersFailure: ['error']
})

export const TestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  items: [],
  fetching: null,
  error: null
}

/* ------------- Selectors ------------- */

export const TestSelectors = {
  selectUsers: state => state.test.items
}

/* ------------- Reducers ------------- */

// request users
export const request = (state, action) =>
  ({ ...state, fetching: true })

// successful users fetch
export const success = (state, action) => {
  const { items: { items } } = action
  return {
    ...state,
    fetching: false,
    error: null,
    items
  }
}

// failed to get users
export const failure = (state) =>
({
  ...state,
  fetching: false,
  error: true,
  items: []
})

/* ------------- Hookup Reducers To Types ------------- */

export const TestReducer = createReducer(INITIAL_STATE, {
  [Types.USERS_REQUEST]: request,
  [Types.USERS_SUCCESS]: success,
  [Types.USERS_FAILURE]: failure
})
