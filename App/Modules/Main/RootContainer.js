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
import ThemeManager from "../../Themes/ThemeManager"
import LocalizationManager from "../../I18n/LocalizationManager"

// Actions
import { AuthActions } from "../Authorization/Redux/AuthRedux"

// styles

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetAvailable: null,
    };
    this.netInfoUnsubscribe;
    this.firebaseAuthUnsubscribe;
  }

  // *** LIFECYCLE METHODS *** //

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    
    this.netInfoUnsubscribe = NetInfo.addEventListener(this.onNetStateChange);
    this.firebaseAuthUnsubscribe = auth().onAuthStateChanged(this.onAuthStateChange);
    
  }

  componentWillUnmount = () => {
    this.netInfoUnsubscribe()
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
    return 
    <ThemeManager>
      <LocalizationManager>
      <ReduxNavigation />
            </LocalizationManager>
          </ThemeManager>
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
