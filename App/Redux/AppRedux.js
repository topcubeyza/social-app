import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setAppLoaded: ['status'],
  setInternetStatus: ['status'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  is_app_loaded: false,
  is_internet_connected: null,
});

/* ------------- Selectors ------------- */

export const IntroSelectors = {
  app: state => state.app,
};

/* ------------- Reducers ------------- */

export const _setAppLoaded = (state, action) =>
  state.merge({is_app_loaded: action.status});

export const _setInternetStatus = (state, action) =>
  state.merge({is_internet_connected: action.status});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_APP_LOADED]: _setAppLoaded,
  [Types.SET_INTERNET_STATUS]: _setInternetStatus,
});
