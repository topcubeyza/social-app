/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import '../Config';
import DebugConfig from "../Config/DebugConfig"
import React, { useEffect, Component } from 'react';
import createStore from '../Redux';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"
import RootContainer from './RootContainer';
import ThemeManager from "../Themes/ThemeManager"
import { StatusBar } from 'react-native';
import { Colors } from '../Themes';


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
          <ThemeManager>
            <StatusBar backgroundColor={Colors.lightBackground_dm} />
            <RootContainer />
          </ThemeManager>
        </PersistGate>
      </Provider>
    )
  }
}

export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
