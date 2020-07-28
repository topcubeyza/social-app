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

class LoginWithEmailScreen extends Component {

    // *** EVENT HANDLERS *** //

    loginRequest = (email, password) => {
        this.props.signInRequest({email, password})
    }

    onPress_Back = () => {
        this.props.navigation.navigate("Welcome");
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <AuthScreensWrapper
                headerText={I18n.t(TextNames.login)}
                textInputsParams={[
                    { key: "email", placeholder: I18n.t(TextNames.email), type: "email" },
                    { key: "password", placeholder: I18n.t(TextNames.password), type: "password" },
                ]}
                topButtonText={I18n.t(TextNames.login)}
                transparentButtonText={I18n.t(TextNames.goBack)}
                onPress_TransparentButton={this.onPress_Back}
                request={this.loginRequest}
                navigation={this.props.navigation}
            />
        )
    }

}

const mapDispatchToProps = dispatch => ({
    signInRequest: ({ email, password }) => dispatch(AuthActions.signInRequest({ email, password })),
})

export default connect(null, mapDispatchToProps)(LoginWithEmailScreen);