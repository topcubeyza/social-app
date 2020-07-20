// Packages
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"

// Project files
import configureStore from "./CreateStore"
import ReduxPersist from '../Config/ReduxPersist';
import rootSaga from '../Sagas/';

// Reducers
import { reducer as navigationReducer } from "./NavigationRedux"
import { reducer as introReducer } from "./IntroRedux"
import { reducer as appReducer } from "./AppRedux"
import { reducer as testReducer } from "./TestRedux"

export const reducers = combineReducers({
    nav: navigationReducer,
    intro: introReducer,
    app: appReducer,
    test: testReducer
})

export default () => {

    console.log("Redux/createStore()")
    let finalReducers = reducers;

    if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig;
        finalReducers = persistReducer(persistConfig, reducers);
    }

    let { store, sagasManager, sagaMiddleware } = configureStore(
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
    
      return store;
}