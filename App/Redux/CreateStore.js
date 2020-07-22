// Packages
import createSagaMiddleware from "redux-saga"
import { applyMiddleware, createStore, compose } from "redux"

// Project files
import { appNavigatorMiddleware } from "../Navigation/ReduxNavigation"
import ScreenTrackingMiddleware from "./ScreenTrackingMiddleware"
import DebugConfig from "../Config/DebugConfig"
import ReduxPersist from "../Config/ReduxPersist"
import Rehydration from "../Services/Rehydration"
import { persistStore } from "redux-persist"


export default (rootReducer, rootSaga) => {

    const middleware = []
    const enhancers = []

    // Navigation
    middleware.push(appNavigatorMiddleware)
    // Analytics
    middleware.push(ScreenTrackingMiddleware)

    // Saga
    const sagaMonitor = DebugConfig.useReactotron ? console.tron.createSagaMonitor() : null
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    middleware.push(sagaMiddleware);
    
    enhancers.push(applyMiddleware(...middleware))

    // If Reactotron is enabled, create store through Reactotron
    const createAppropriateStore = DebugConfig.useReactotron ? console.tron.createStore : createStore;
    const store = createAppropriateStore(rootReducer, compose(...enhancers));

    // configure persistStore
    // if (ReduxPersist.active) {
    //     Rehydration.updateReducers(store);
    // }

    let sagasManager = sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store)

    return {
        store,
        persistor,
        sagasManager,
        sagaMiddleware
    }

}