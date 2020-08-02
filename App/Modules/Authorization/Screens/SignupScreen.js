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

    createUserRequest = ({email, password, displayName}) => {
        this.props.createUserRequest({ email, password, displayName })
    }

    onSignupSuccess = () => {
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
                    { inputKey: "displayName", placeholder: I18n.t(TextNames.displayName), type: "text" },
                    { inputKey: "email", placeholder: I18n.t(TextNames.email), type: "email" },
                    { inputKey: "password", placeholder: I18n.t(TextNames.password), type: "password" },
                    { inputKey: "passwordConfirm", placeholder: I18n.t(TextNames.confirmPassword), type: "password" },
                ]}
                topButtonText={I18n.t(TextNames.signup)}
                transparentButtonText={""}
                onPress_TransparentButton={() => {}}
                request={this.createUserRequest}
                onRequestSuccess={this.onSignupSuccess}
                dataFieldName="candidateUser"
                isDataValid={data => data != null}
            />
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
})

const mapDispatchToProps = dispatch => ({
    createUserRequest: ({ email, password, displayName }) => dispatch(AuthActions.createUserRequest({ email, password, displayName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);