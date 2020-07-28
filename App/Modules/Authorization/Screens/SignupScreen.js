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

    signupRequest = ({email}) => {
        this.props.sendLinkRequest({ email })
    }

    onSignupSuccess = () => {
        this.props.navigation.navigate("SignedIn");
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
                request={this.signupRequest}
                onRequestSuccess={this.onSignupSuccess}
                dataFieldName="user"
                dataFieldSuccess={data => data && !validate.isEmpty(data.displayName)}
            />
        )
    }

}

const mapDispatchToProps = dispatch => ({
    sendLinkRequest: ({ email }) => dispatch(AuthActions.sendLinkRequest({ email })),
})

export default connect(null, mapDispatchToProps)(SignupScreen);