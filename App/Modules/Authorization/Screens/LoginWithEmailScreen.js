// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import validate from "validate.js"

// RN Components
import { View, Keyboard } from "react-native"

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"
import ForgotPasswordModal from "../Components/ForgotPasswordModal"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Utils
import { showAlert, closeAlert } from "../../../Helpers/AlertHelpers";

// Styles
import { Texts, localized } from "../../../Localization";

/**
 * A screen that renders a ui for the user to login with email and password
 */
class LoginWithEmailScreen extends Component {

    state = {
        isVisible_ForgotPasswordModal: false
    }

    // *** EVENT HANDLERS *** //

    loginRequest = ({ email, password }) => {
        // Call the Auth Action to login
        this.props.signInRequest({ email, password })
    }

    onPress_ForgotPass = () => {
        // Dismiss keyboard and slide the ForgotPasswordModal
        Keyboard.dismiss();
        this.setState({
            isVisible_ForgotPasswordModal: true
        })
    }

    // The callback function for ForgotPasswordModal
    // to call after the password-reset email is successfully sent
    onLinkSent = (email) => {
        // Hide the modal
        this.setState({
            isVisible_ForgotPasswordModal: false
        }, () => {
            // Give user feedback and tell them to check their mailbox in an alert
            showAlert({
                title: localized.text(Texts.success),
                message: localized.text(Texts.resetEmailSuccessMessage, {email}),
                buttons: [
                    {
                        text: localized.text(Texts.ok),
                        onPress: () => {
                            closeAlert()
                        }
                    },
                ]
            })
        })
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <View style={{flex:1}}>
                <AuthScreensWrapper
                    headerText={localized.text(Texts.login)}
                    textInputsParams={[
                        { inputKey: "email", placeholder: localized.text(Texts.email), type: "email" },
                        { inputKey: "password", placeholder: localized.text(Texts.password), type: "password" },
                    ]}
                    topButtonText={localized.text(Texts.login)}
                    transparentButtonText={localized.text(Texts.forgotPassword)}
                    onPress_TransparentButton={this.onPress_ForgotPass}
                    request={this.loginRequest}
                    onRequestSuccess={() => { }}
                    dataFieldName="user"
                    isDataValid={data => true}
                />
                <ForgotPasswordModal
                    isVisible={this.state.isVisible_ForgotPasswordModal}
                    onModalHide={() => this.setState({ isVisible_ForgotPasswordModal: false })}
                    onLinkSent={this.onLinkSent} />
            </View>
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