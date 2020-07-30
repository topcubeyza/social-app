import React, { Component } from 'react'
import { connect } from "react-redux"
import auth from '@react-native-firebase/auth';
import { NavigationActions } from "react-navigation"

import { AuthActions } from "../Redux/AuthRedux"

import { getUpdateCause } from "../../../Helpers/ReduxHelpers"

class AuthorizationManager extends Component {

    constructor(props) {
        super(props);

        this.firebaseAuthUnsubscribe;
    }

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        this.firebaseAuthUnsubscribe = auth().onAuthStateChanged(this.onAuthStateChange);
        if (this.props.auth.user != null) {
            this.props.navigate("SignedIn")
        }
        if (this.props.auth.candidateUser != null) {
            this.props.navigate("UnverifiedUser")
        }
    }

    componentDidUpdate(prevProps) {
        let currentProps = this.props;
        if (prevProps.auth == currentProps.auth) {
            return;
        }
        if (prevProps.auth.user == null && currentProps.auth.user != null) {
            this.props.navigate("SignedIn")
            return;
        }
        if (prevProps.auth.candidateUser == null && currentProps.auth.candidateUser != null) {
            this.props.navigate("UnverifiedUser")
            return;
        }
        if (prevProps.auth.user != null && currentProps.auth.user == null) {
            this.props.navigate("SignedOut")
            return;
        }
        if (prevProps.auth.candidateUser != null && currentProps.auth.candidateUser == null && currentProps.auth.user == null) {
            this.props.navigate("Welcome")
            return;
        }
    }

    componentWillUnmount() {
        this.firebaseAuthUnsubscribe()
    }

    // *** CALLBACKS *** //

    onAuthStateChange = state => {
        this.props.authStateChange(state)
    }

    render() {
        return <>{this.props.children}</>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => {
    return ({
        authStateChange: (state) => dispatch(AuthActions.authStateChange({ state })),
        navigate: (screenName) => dispatch(NavigationActions.navigate({routeName: screenName}))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationManager);