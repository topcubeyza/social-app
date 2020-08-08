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
import LocalizationManager from "../../Localization/LocalizationManager"
import AlertManager from './AlertManager';

// Components
import LoadingOverlay from "../Main/LoadingOverlay"

// Actions
import { AuthActions } from "../Authorization/Redux/AuthRedux"
import { showAlert, closeAlert } from '../../Helpers/AlertHelpers';
import { localized, Texts } from '../../Localization';

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

  componentDidUpdate(prevProps, prevState) {
    
  }

  componentWillUnmount = () => {
    this.netInfoUnsubscribe()
  }

  // *** CALLBACKS *** //

  onNetStateChange = state => {
    let wasInternetAvailable = this.state.isInternetAvailable;
    let isInternetAvailable = state.isConnected && state.isInternetReachable
    let netIsGoneNow = (wasInternetAvailable == null || wasInternetAvailable == true) && !isInternetAvailable
    let netIsBackNow = !wasInternetAvailable && isInternetAvailable;

    this.setState({
      isInternetAvailable: isInternetAvailable,
    }, () => {
      if (netIsBackNow) {
        closeAlert();
      }
      else if (netIsGoneNow) {
        showAlert({
          title: localized.text(Texts.netGoneTitle),
          message: localized.text(Texts.netGoneMessage),
          cancellable: false,
        })
      }
    });
  }

  // *** RENDER METHODS *** //

  render() {
    const { isInternetAvailable } = this.state;
    return (
      <AuthorizationManager>
        <ThemeManager>
          <LocalizationManager>
            <AlertManager />
            <LoadingOverlay />
            {
              isInternetAvailable ?
              <ReduxNavigation /> : null
            }
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
