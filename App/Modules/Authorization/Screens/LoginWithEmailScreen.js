// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import I18n from "react-native-i18n";
import validate from "validate.js"

// RN Components

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import { TextNames } from "../../../I18n/languages/Names";

class LoginWithEmailScreen extends Component {

    // *** EVENT HANDLERS *** //

    loginRequest = ({email, password}) => {
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
                    { inputKey: "email", placeholder: I18n.t(TextNames.email), type: "email" },
                    { inputKey: "password", placeholder: I18n.t(TextNames.password), type: "password" },
                ]}
                topButtonText={I18n.t(TextNames.login)}
                transparentButtonText={I18n.t(TextNames.forgotPassword)}
                onPress_TransparentButton={this.onPress_Back}
                request={this.loginRequest}
                onRequestSuccess={() => {}}
                dataFieldName="user"
                isDataValid={data => true}
            />
        )
    }

}

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.locale,
})

const mapDispatchToProps = dispatch => ({
    signInRequest: ({ email, password }) => dispatch(AuthActions.signInRequest({ email, password })),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmailScreen);