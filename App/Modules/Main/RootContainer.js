// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'react-native';

// Configs etc.
import ReduxNavigation from '../../Navigation/ReduxNavigation';
import StartupActions from '../../Redux/StartupRedux';
import ReduxPersist from '../../Config/ReduxPersist';

// Actions
import { AuthActions } from "../Authorization/Redux/AuthRedux"

// styles
import { Colors, ThemeContext } from '../../Themes';

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

  // *** LIFECYCLE METHODS *** //

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    
    this.netInfoSubs = NetInfo.addEventListener(this.onNetStateChange);
    this.firebaseAuthUnsubscribe = auth().onAuthStateChanged(this.onAuthStateChange);
    
  }

  componentWillUnmount = () => {
    this.firebaseAuthUnsubscribe()
  }

  // *** CALLBACKS *** //

  onNetStateChange = state => {
    this.setState({
      isInternetAvailable: state.isConnected && state.isInternetReachable,
    });
  }

  onAuthStateChange = data => {
    let user = (data && data._user) ? data._user : data
    this.props.authStateChange(user)
  }

  // *** RENDER METHODS *** //

  render() {
    const { isInternetAvailable } = this.state;
    if (isInternetAvailable === false) {
      return null;
    }
    return <>
      <StatusBar backgroundColor={this.context.color(Colors.lightBackground_dm)} />
      <ReduxNavigation />
    </>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(StartupActions.startup()),
    authStateChange: (user) => dispatch(AuthActions.authStateChange({ user }))
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(RootContainer);
