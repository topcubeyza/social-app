// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'react-native';

// Configs etc.
import ReduxNavigation from '../../Navigation/ReduxNavigation';
import StartupActions from '../../Redux/StartupRedux';
import ReduxPersist from '../../Config/ReduxPersist';
import AuthorizationManager from "../Authorization/Components/AuthorizationManager"
import ThemeManager from "../../Theming/ThemeManager"
import LocalizationManager from "../../I18n/LocalizationManager"
import AlertManager from './AlertManager';

// Components
import LoadingOverlay from "../Main/LoadingOverlay"

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
  }

  // *** LIFECYCLE METHODS *** //

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }

    this.netInfoUnsubscribe = NetInfo.addEventListener(this.onNetStateChange);

  }

  componentWillUnmount = () => {
    this.netInfoUnsubscribe()
  }

  // *** CALLBACKS *** //

  onNetStateChange = state => {
    this.setState({
      isInternetAvailable: state.isConnected && state.isInternetReachable,
    });
  }

  // *** RENDER METHODS *** //

  render() {
    const { isInternetAvailable } = this.state;
    if (isInternetAvailable === false) {
      return null;
    }
    return (
      <AuthorizationManager>
        <ThemeManager>
          <LocalizationManager>
              <AlertManager />
              <LoadingOverlay />
              <ReduxNavigation />
          </LocalizationManager>
        </ThemeManager>
      </AuthorizationManager>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(StartupActions.startup()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(RootContainer);
