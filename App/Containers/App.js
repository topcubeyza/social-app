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
import {Provider} from 'react-redux';
import RootContainer from './RootContainer';

const store = createStore();

const App = () => {

    useEffect(() => {
      SplashScreen.hide();
    }, [])

    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
}

export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
