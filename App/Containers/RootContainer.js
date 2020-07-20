import React, {Component} from 'react';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {connect} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

import NetInfo from '@react-native-community/netinfo';

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetAvailable: null,
    };
    this.netInfoSubs;
  }

  init = () => {
    this.isInternetAvailable();
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

  render() {
    const {isInternetAvailable} = this.state;
    if (isInternetAvailable === false) {
      return null;
    }
    return <ReduxNavigation />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(StartupActions.startup()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
