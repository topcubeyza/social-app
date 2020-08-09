// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";

// RN Components

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Utils
import { Texts, localized } from "../../../Localization";

// Styles

/**
 * A screen that renders a ui for the user to signup with email, password, and displayName
 */
class SignupScreen extends Component {

    // *** EVENT HANDLERS *** //

    createUserRequest = ({email, password, displayName}) => {
        // Call the Auth Action
        this.props.createUserRequest({ email, password, displayName })
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <AuthScreensWrapper
                headerText={localized.text(Texts.signup)}
                textInputsParams={[
                    { inputKey: "displayName", placeholder: localized.text(Texts.displayName), type: "text" },
                    { inputKey: "email", placeholder: localized.text(Texts.email), type: "email" },
                    { inputKey: "password", placeholder: localized.text(Texts.password), type: "password" },
                    { inputKey: "passwordConfirm", placeholder: localized.text(Texts.confirmPassword), type: "password" },
                ]}
                topButtonText={localized.text(Texts.signup)}
                request={this.createUserRequest}
                onRequestSuccess={() => {}}
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