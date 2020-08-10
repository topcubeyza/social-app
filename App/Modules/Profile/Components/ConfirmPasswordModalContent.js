// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    Keyboard
} from "react-native"

// Components
import SingleLineInputBackground from "../../../Components/SingleLineInputBackground"
import Button from "../../../Components/Button"
import ErrorMessage from "../../../Components/ErrorMessage"

// Actions

// Utils
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/ConfirmPasswordModalContentStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 *  A component that renders a ui for the user to reauthenticate herself with her password
 * @augments {Component<Props>}
 */
class ConfirmPasswordModalContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: ""
        }

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

    // *** REF METHODS *** //

    showErrorMessage = (error) => {
        this.errorRef && this.errorRef.showErrorMessage(error);
    }

    // *** EVENT HANDLERS *** //

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
                this.props.reauthenticateUser(this.state.password);
            })
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <>
                <View style={styles.topContainer}>
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
            </>
        );
    }

}

ConfirmPasswordModalContent.propTypes = {
    /** A method that is called with the param 'password' to reauthenticate the user */
    reauthenticateUser: PropTypes.func.isRequired
}

ConfirmPasswordModalContent.defaultProps = {
}

export default ConfirmPasswordModalContent;