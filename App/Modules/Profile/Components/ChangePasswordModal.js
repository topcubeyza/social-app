// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "react-native-modal"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    Keyboard
} from "react-native"

// Components
import SlidingUpModal from "../../../Components/SlidingUpModal"
import SingleLineInputBackground from "../../../Components/SingleLineInputBackground"
import Button from "../../../Components/Button"
import ErrorMessage from "../../../Components/ErrorMessage"

// Actions

// Utils
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/ChangePasswordModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * A modal that renders a ui for the user to change password
 * @augments {Component<Props>}
 */
class ChangePasswordModal extends Component {

    constructor(props) {
        super(props);

        // The initial state must be saved to return to it when modal hides
        this.initialState = {
            password: "",
            passwordConfirm: "",
            loading: false
        }

        this.state = { ...this.initialState }

        // These two variables hold the reference to the inputs on the screen
        this.passwordInput = null;
        this.passwordConfirmInput = null;

        this.keyboardVisible = false;
    }

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow)
        if (Platform.OS == "ios") {
            this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this.onKeyboardDidHide)
        }
        else {
            this.keyboardDidHideListeneer = Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide)
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        if (Platform.OS == "ios") {
            this.keyboardWillHideListener.remove();
        }
        else {
            this.keyboardDidHideListeneer.remove();
        }
    }

    // *** CALLBACKS *** //

    onKeyboardDidShow = () => {
        if (!this.keyboardVisible) {
            this.keyboardVisible = true;
        }
    }

    onKeyboardDidHide = () => {
        if (this.keyboardVisible) {
            this.keyboardVisible = false;

            // When keyboard hides, underline of the textinputs must be removed
            if (this.passwordInput != null && this.passwordConfirmInput != null) {
                this.passwordInput.removeUnderline()
                this.passwordConfirmInput.removeUnderline()
            }
        }
    }

    // *** CONVENIENCE METHODS *** //

    // Calls the API to change the password
    changePassword = () => {
        let newPassword = this.state.password;

        FirebaseApi.changePassword({ newPassword })
            .then(() => {
                // Set the loading mode off and call the parent's callback
                this.setState({
                    loading: false
                }, () => {
                    this.props.onPasswordChanged();
                })
            })
            .catch((error) => {
                // Set the loading mode off and show the error message
                this.setState({
                    loading: false
                }, () => {
                    this.errorRef && this.errorRef.showErrorMessage(error);
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onModalHide = () => {
        this.props.onModalHide();

        // Return to initial state, so that when the modal is shown again, it will be brand new
        this.setState({ ...this.initialState })
    }

    onChangeText_Password = (text) => {

        // Simply updating state when the password text changes
        this.setState({
            password: text
        })
    }

    onChangeText_PasswordConfirm = (text) => {
        // Simply updating state when the password confirm text changes
        this.setState({
            passwordConfirm: text
        })
    }

    // The Confirm button's onPress method
    onPress_Confirm = () => {
        // Check the validity of the fields first.
        let { ok, message } = checkFields({ password: this.state.password, passwordConfirm: this.state.passwordConfirm });
        if (!ok) {
            // Show the error message if the fields are not valid
            this.errorRef && this.errorRef.showErrorMessage(message);
        }
        else {
            // Dismiss the keyboard, show the loading overlay and call the api
            Keyboard.dismiss();
            this.setState({
                loading: true
            }, () => {
                this.changePassword();
            })
        }
    }

    onFocus_Password = () => {
        // When password input is focused, passwordConfirm input's underline must be removed
        this.passwordConfirmInput.removeUnderline()
    }

    onFocus_PasswordConfirm = () => {
        // When passwordConfirm input is focused, password input's underline must be removed
        this.passwordInput.removeUnderline();
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                keyAsProp="change-password"
                isVisible={this.props.isVisible}
                onModalHide={this.onModalHide}
                loading={this.state.loading}
            >
                <View style={styles.topContainer}>
                    {/* Password Input */}
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.passwordInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_Password}
                            placeholder={localized.text(Texts.newPassword)}
                            value={this.state.password}
                            margin={Metrics.marginHorizontal}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onFocus={this.onFocus_Password} />
                    </View>
                    {/* Password Confirm Input */}
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.passwordConfirmInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_PasswordConfirm}
                            placeholder={localized.text(Texts.confirmPassword)}
                            value={this.state.passwordConfirm}
                            margin={Metrics.marginHorizontal}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onFocus={this.onFocus_PasswordConfirm} />
                    </View>
                    {/* Error Message */}
                    <View style={styles.errorTextContainer}>
                        <ErrorMessage key="auth-screens-wrapper-error" ref={ref => this.errorRef = ref} />
                    </View>
                </View>
                {/* The part that renders the 'confirm' button in a container with a different background color
                Use SafeAreaView to put the button inside the safe area */}
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text={localized.text(Texts.confirm)}
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Confirm} />
                    </View>
                </SafeAreaView>
            </SlidingUpModal>
        );
    }

}

ChangePasswordModal.propTypes = {
    /** The visibility of the modal */
    isVisible: PropTypes.bool.isRequired,
    /** The callback function to call when the password is successfully changed */
    onPasswordChanged: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

ChangePasswordModal.defaultProps = {
    onModalHide: () => { }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(ChangePasswordModal);