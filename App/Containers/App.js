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

const {store, persistor} = createStore();

class App extends Component {

  constructor(props) {
    super(props)

    this.firstTime = true;
  }

  render() {

    /*
    setTimeout(() => {
      console.log("running timeout function", moment.now())
      if (this.state.firstTime) {
        this.setState({
          firstTime: false
        })
      }
    }, 3000);
    */

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
