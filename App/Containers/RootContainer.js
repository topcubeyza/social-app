import React, {Component} from 'react';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {connect} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import auth from '@react-native-firebase/auth';
import {AuthActions} from "../Redux/AuthRedux"

import NetInfo from '@react-native-community/netinfo';
import { ThemeContext } from '../Themes/ThemeManager';
import { StatusBar } from 'react-native';
import { Colors } from '../Themes';

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetAvailable: null,
    };
    this.netInfoSubs;
    this.firebaseAuthUnsubscribe;
  }

  static contextType = ThemeContext

  init = () => {
    this.isInternetAvailable();
    this.subscribeToAuthStateChange();
  };

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    this.init();
  }

  isInternetAvailable = async () => {
    this.netInfoSubs = NetInfo.addEventListener(state => {
      this.setState({
        isInternetAvailable: state.isConnected && state.isInternetReachable,
      });
    });
  };

  subscribeToAuthStateChange = () => {
    this.firebaseAuthUnsubscribe = auth().onAuthStateChanged(data => {
      let user = (data && data._user) ? data._user : data
      this.props.authStateChange(user)
    });
  }

  componentWillUnmount = () => {
    this.firebaseAuthUnsubscribe()
  }

  render() {
    const {isInternetAvailable} = this.state;
    if (isInternetAvailable === false) {
      return null;
    }
    return <>
      <StatusBar backgroundColor={this.context.color(Colors.lightBackground_dm)}/>
      <ReduxNavigation />
    </>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(StartupActions.startup()),
    authStateChange: (user) => dispatch(AuthActions.authStateChange({user}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
