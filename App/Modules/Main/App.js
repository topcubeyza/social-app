/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// Packages
import React, { useEffect, Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"

// Configs etc.
import '../../Config';
import DebugConfig from "../../Config/DebugConfig"
import createStore from '../../Redux';
import RootContainer from './RootContainer';
import { NativeModules } from 'react-native';

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true)
}


const { store, persistor } = createStore();

class App extends Component {

  constructor(props) {
    super(props)

    this.firstTime = true;
  }

  render() {

    if (this.firstTime) {
      SplashScreen.hide()
      this.firstTime = false
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <RootContainer />
        </PersistGate>
      </Provider>
    )
  }
}

export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
