import { createReducer, createActions } from 'reduxsauce'
import _ from "lodash"

/* ------------- Types and Action Creators ------------- */

const Types = {
    ADD_ALERT: "alert/add_alert",
    REMOVE_LAST_ALERT: "alert/remove_alert"
}

const Actions = {
    addAlert: (alert) => ({
        type: Types.ADD_ALERT,
        payload: { alert }
    }),
    removeAlert: () => ({
        type: Types.REMOVE_LAST_ALERT
    })
}

export const AlertTypes = Types
export const AlertActions = Actions

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    alerts: [],
}

/* ------------- Reducers ------------- */

export const addAlert = (state, action) => {
    let { alert } = action.payload

    let newState = _.cloneDeep(state);
    newState.alerts.push(alert);

    return newState;
}

export const removeLastAlert = (state, action) => {
    let newState = _.cloneDeep(state);
    newState.alerts.pop();

    return newState;
}

/* ------------- Hookup Reducers To Types ------------- */

export const AlertReducer = createReducer(INITIAL_STATE, {
    [Types.ADD_ALERT]: addAlert,
    [Types.REMOVE_LAST_ALERT]: removeLastAlert,
})