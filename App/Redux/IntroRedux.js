import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setIntroViewed: ['status'],
});

export const IntroTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  is_intro_viewed: null,
});

/* ------------- Selectors ------------- */

export const IntroSelectors = {
  intro: state => state.intro,
};

/* ------------- Reducers ------------- */

export const _setIntroViewed = (state, action) =>
  state.merge({is_intro_viewed: action.status});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INTRO_VIEWED]: _setIntroViewed,
});
