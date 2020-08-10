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
import getStyles from "../Styles/PasswordConfirmationModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 *  A modal that renders a ui for the user to reauthenticate herself with her password
 * @augments {Component<Props>}
 */
class PasswordConfirmationModal extends Component {

    constructor(props) {
        super(props);

        // The initial state must be saved to return to it when modal hides
        this.initialState = {
            password: "",
        }

        this.state = { ...this.initialState }

        // Holds the reference to password input
        this.passwordInput = null;

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

            // When keyboard hides, underline of the password input must be removed
            if (this.passwordInput != null) {
                this.passwordInput.removeUnderline()
            }
        }
    }

    // *** CONVENIENCE METHODS *** //

    // Calls the API to reauthenticate user
    reauthenticateUser = () => {
        let email = this.props.user.email;
        let password = this.state.password;

        FirebaseApi.reauthenticate({ email, password })
            .then(result => {
                // Set the loading mode off and call the parent's callback
                this.setState({
                    loading: false
                }, () => {
                    this.props.onPasswordConfirmed();
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

    // The Proceed button's onPress method
    onPress_Proceed = () => {
        // Check the validity of password first.
        let { ok, message } = checkFields({ password: this.state.password });
        if (!ok) {
            // Show the error message if password is not valid
            this.errorRef && this.errorRef.showErrorMessage(message);
        }
        else {
            // Dismiss the keyboard, show the loading overlay and call the api
            Keyboard.dismiss();
            this.setState({
                loading: true
            }, () => {
                this.reauthenticateUser();
            })
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                isVisible={this.props.isVisible}
                onModalHide={this.onModalHide}
                loading={this.state.loading}
            >
                <View style={styles.topContainer}>
                    {/* The part that shows an explanatory message to user */}
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <SVG.EditPassword style={styles.icon} width={"100%"} height={"100%"} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{localized.text(Texts.passwordConfirmMessage)}</Text>
                        </View>
                    </View>
                    {/* Password Input */}
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.passwordInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_Password}
                            placeholder={localized.text(Texts.password)}
                            value={this.state.password}
                            margin={Metrics.marginHorizontal}
                            autoCapitalize="none"
                            secureTextEntry={true} />
                    </View>
                    {/* Error message */}
                    <View style={styles.errorTextContainer}>
                        <ErrorMessage key="auth-screens-wrapper-error" ref={ref => this.errorRef = ref} />
                    </View>
                </View>
                {/* The part that renders the 'proceed' button in a container with a different background color
                Use SafeAreaView to put the button inside the safe area */}
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text={localized.text(Texts.proceed)}
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Proceed} />
                    </View>
                </SafeAreaView>
            </SlidingUpModal>
        );
    }

}

PasswordConfirmationModal.propTypes = {
    /** The visibility of the modal */
    isVisible: PropTypes.bool.isRequired,
    /** The callback function to call when the user is successfully reauthenticated */
    onPasswordConfirmed: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

PasswordConfirmationModal.defaultProps = {
    onModalHide: () => { }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(PasswordConfirmationModal);