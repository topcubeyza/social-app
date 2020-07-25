/**
 * @format
 */

import './App/Config/ReactotronConfig'
import {AppRegistry} from 'react-native';
import App from './App/Modules/Main/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);