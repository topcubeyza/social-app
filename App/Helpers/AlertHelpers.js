import { store } from "../Modules/Main/App"
import { AlertActions } from "../Redux/AlertRedux"

export const showAlert = alert => {
  store.dispatch(AlertActions.addAlert(alert));
}

export const closeAlert = () => {
  store.dispatch(AlertActions.removeAlert());
}