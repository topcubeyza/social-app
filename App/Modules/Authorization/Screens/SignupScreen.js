// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import I18n from "react-native-i18n";

// RN Components

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import { TextNames } from "../../../I18n/languages/Names";

class SignupScreen extends Component {

    // *** EVENT HANDLERS *** //

    signupRequest = (email, password) => {
        this.props.createUserRequest({ email, password })
    }

    onPress_LoginInstead = () => {
        this.props.navigation.navigate("Welcome");
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <AuthScreensWrapper
                headerText={I18n.t(TextNames.signup)}
                textInputsParams={[
                    { inputKey: "email", placeholder: I18n.t(TextNames.email), type: "email" },
                    { inputKey: "password", placeholder: I18n.t(TextNames.password), type: "password" },
                    { inputKey: "passwordConfirm", placeholder: I18n.t(TextNames.confirmPassword), type: "password" }
                ]}
                topButtonText={I18n.t(TextNames.signup)}
                transparentButtonText={I18n.t(TextNames.loginInstead)}
                onPress_TransparentButton={this.onPress_LoginInstead}
                request={this.signupRequest}
                navigation={this.props.navigation}
            />
        )
    }

}

const mapDispatchToProps = dispatch => ({
    createUserRequest: ({ email, password }) => dispatch(AuthActions.createUserRequest({ email, password })),
})

export default connect(null, mapDispatchToProps)(SignupScreen);