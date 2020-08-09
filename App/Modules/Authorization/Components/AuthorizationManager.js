import React, { Component } from 'react'
import { connect } from "react-redux"
import auth from '@react-native-firebase/auth';
import { NavigationActions } from "react-navigation"

import { AuthActions } from "../Redux/AuthRedux"

import { getUpdateCause } from "../../../Helpers/ReduxHelpers"

/**
 * Manages authorization globally
 * Handles auth state changes
 * Navigates the app's user to the relevant screens based on the authorization status
 */
class AuthorizationManager extends Component {

    constructor(props) {
        super(props);

        this.firebaseAuthUnsubscribe;
    }

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        // Add a listener for when the firebase auth state changes
        this.firebaseAuthUnsubscribe = auth().onAuthStateChanged(this.onAuthStateChange);

        // Navigate to the SignedInNavigation if there is a signed in user.
        if (this.props.auth.user != null) {
            this.props.navigate("SignedIn")
        }
        // Navigate to the UnverifiedUserScreen if there is a candidate user who hasn't yet verified his/her email address.
        if (this.props.auth.candidateUser != null) {
            this.props.navigate("UnverifiedUser")
        }

        // If none of the ifs above turned out 'true', then there is no user at all.
    }

    componentDidUpdate(prevProps) {
        let currentProps = this.props;

        // Do nothing if there is no change with respect to props
        if (prevProps.auth == currentProps.auth) {
            return;
        }

        // If there was no user before, but there is now:
        // Then a user just signed in => navigate to the SignedInNavigator
        if (prevProps.auth.user == null && currentProps.auth.user != null) {
            this.props.navigate("SignedIn")
            return;
        }

        // If there was no candidate user before, but there is now:
        // Then a user just signed in with an unverified email => navigate to the UnverifiedUserScreen
        if (prevProps.auth.candidateUser == null && currentProps.auth.candidateUser != null) {
            this.props.navigate("UnverifiedUser")
            return;
        }

        // If there was a user before, but there is none now:
        // Then a user just signed out => navigate to the SignedOutNavigator
        if (prevProps.auth.user != null && currentProps.auth.user == null) {
            this.props.navigate("SignedOut")
            return;
        }

        // If there was a candidate user before, but there is none now and there is no user neither:
        // Then the candidate user has just unsigned => navigate to the WelcomeScreen
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
        // Call the corresponding Redux action
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