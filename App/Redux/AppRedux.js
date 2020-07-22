import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const Types = {
  SET_APP_LOADED: "app/set_app_loaded",
  SET_INTERNET_STATUS: "app/set_internet"
}

const Actions = {
  setAppLoaded: status => ({
    type: Types.SET_APP_LOADED,
    payload: {
      status
    }
  }),
  setInternetStatus: status => ({
    type: Types.SET_INTERNET_STATUS,
    payload: {
      status
    }
  })
}

export const AppTypes = Types;
export const AppActions = Actions;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  is_app_loaded: false,
  is_internet_connected: null,
});

/* ------------- Selectors ------------- */

export const AppSelectors = {
  app: state => state.app,
};

/* ------------- Reducers ------------- */

export const _setAppLoaded = (state, action) =>
  state.merge({is_app_loaded: action.status});

export const _setInternetStatus = (state, action) =>
  state.merge({is_internet_connected: action.status});

/* ------------- Hookup Reducers To Types ------------- */

export const AppReducer  = createReducer(INITIAL_STATE, {
  [Types.SET_APP_LOADED]: _setAppLoaded,
  [Types.SET_INTERNET_STATUS]: _setInternetStatus,
});
