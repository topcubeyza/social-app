import { store } from "../Modules/Main/App"
import { AlertActions } from "../Redux/AlertRedux"

// Shortcut function to dispatch an action to add an alert to the alert stack
export const showAlert = alert => {
  store.dispatch(AlertActions.addAlert(alert));
}

// Shortcut function to dispatch an action to pop the last alert from the alert stack
export const closeAlert = () => {
  store.dispatch(AlertActions.removeAlert());
}