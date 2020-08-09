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

// Actions

// Utils
import checkFields from "../Utils/CredentialsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/ForgotPasswordModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * A modal that renders a ui for the user to reset password
 * @augments {Component<Props>}
 */
class ForgotPasswordModal extends Component {

    constructor(props) {
        super(props);

        // The initial state must be saved to return to it when modal hides
        this.initialState = {
            email: "",
            errorMessage: "",
            loading: false
        }

        this.state = { ...this.initialState }

        // Holds the reference to email input
        this.emailInput = null;
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

            // When keyboard hides, underline of the email input must be removed
            if (this.emailInput != null) {
                this.emailInput.removeUnderline()
            }
        }
    }

    // *** CONVENIENCE METHODS *** //

    showErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        }, () => {
            // Show an error message for two seconds

            // clear timeout so that when user taps button repeatedly,
            // disappearing of error message will be delayed
            if (this.errorMessageTimeout) {
                clearTimeout(this.errorMessageTimeout)
            }
            this.errorMessageTimeout = setTimeout(() => {
                this.setState({
                    errorMessage: ""
                })
            }, 2000);
        })
    }

    // Calls the API to send reset link
    sendLink = () => {
        FirebaseApi.sendPasswordResetEmail({ email: this.state.email })
            .then(() => {
                // Set the loading mode off and call the parent's callback
                this.setState({
                    loading: false
                }, () => {
                    this.props.onLinkSent(this.state.email);
                })
            })
            .catch((error) => {
                // Set the loading mode off and show the error message
                this.setState({
                    loading: false
                }, () => {
                    this.showErrorMessage(error);
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onModalHide = () => {
        this.props.onModalHide();

        // Return to initial state, so that when the modal is shown again, it will be brand new
        this.setState({ ...this.initialState })
    }

    onChangeText_Email = (text) => {

        // Simply updating state when the email text changes
        this.setState({
            email: text
        })
    }

    // The Send button's onPress method
    onPress_Send = () => {
        // Check the validity of email first.
        let { ok, message } = checkFields({ email: this.state.email });
        if (!ok) {
            // Show the error message if email is not valid
            this.showErrorMessage(message)
        }
        else {
            // Dismiss the keyboard, show the loading overlay and call the api
            Keyboard.dismiss();
            this.setState({
                loading: true
            }, () => {
                this.sendLink();
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
                            <SVG.Mail style={styles.icon} width={"100%"} height={"100%"} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{localized.text(Texts.enterEmailToReset)}</Text>
                        </View>
                    </View>
                    {/* Email Input */}
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.emailInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_Email}
                            placeholder={localized.text(Texts.email)}
                            value={this.state.email}
                            margin={Metrics.marginHorizontal}
                            autoCapitalize="none" />
                    </View>
                    {/* Error message */}
                    <View style={styles.errorTextContainer}>
                        {
                            this.state.errorMessage === "" ?
                                null
                                :
                                <Text numberOfLines={2} style={styles.errorText}>
                                    {this.state.errorMessage}
                                </Text>
                        }
                    </View>
                </View>
                {/* The part that renders the button in a container with a different background color
                Use SafeAreaView to put the button inside the safe area */}
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text={localized.text(Texts.sendLink)}
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Send} />
                    </View>
                </SafeAreaView>
            </SlidingUpModal>
        );
    }

}

ForgotPasswordModal.propTypes = {
    /** The visibility of the modal */
    isVisible: PropTypes.bool.isRequired,
    /** The callback function to call when the password reset email is successfully sent */
    onLinkSent: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

ForgotPasswordModal.defaultProps = {
    onModalHide: () => { }
}

export default ForgotPasswordModal;