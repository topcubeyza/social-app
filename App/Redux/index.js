// Packages
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"

// Project files
import configureStore from "./CreateStore"
import ReduxPersist from '../Config/ReduxPersist';
import rootSaga from '../Sagas/';

// Reducers
import { NavReducer } from "./NavigationRedux"
import { AppReducer } from "./AppRedux"
import { TestReducer } from "./TestRedux"
import { AuthReducer } from "../Modules/Authorization/Redux/AuthRedux"


export const reducers = combineReducers({
    nav: NavReducer,
    app: AppReducer,
    test: TestReducer,
    auth: AuthReducer
})

export default () => {

    let finalReducers = reducers;
    if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig;
        finalReducers = persistReducer(persistConfig, reducers);
    }

    let { store, persistor, sagasManager, sagaMiddleware } = configureStore(
        finalReducers,
        rootSaga,
    );

    if (module.hot) {
        module.hot.accept(() => {
          const nextRootReducer = require('./').reducers;
          store.replaceReducer(nextRootReducer);
    
          const newYieldedSagas = require('../Sagas').default;
          sagasManager.cancel();
          sagasManager.done.then(() => {
            sagasManager = sagaMiddleware(newYieldedSagas);
          });
        });
      }
    
      return {store, persistor};
}