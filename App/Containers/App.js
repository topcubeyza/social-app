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
import RootContainer from './RootContainer';

const store = createStore();

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstTime: true
    }
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

    if (this.state.firstTime) {
      SplashScreen.hide()
      this.setState({
        firstTime: false
      })
    }

    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
