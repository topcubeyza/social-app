// Packages
import React, { Component } from "react"
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
import checkFields from "../Utils/FieldsCheck"

// Styles
import getStyles from "../Styles/PasswordConfirmationModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * @augments {Component<Props,State>}
 */
class PasswordConfirmationModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            errorMessage: "",
        }

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

            // When keyboard hides, underline of the textinput must be removed
            if (this.passwordInput != null) {
                this.passwordInput.removeUnderline()
            }
        }
    }

    // *** REF METHODS *** //

    // *** CONVENIENCE METHODS *** //

    showErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        }, () => {
            // Show an error message for two seconds if fields are not valid

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

    // *** EVENT HANDLERS *** //

    onChangeText_Password = (text) => {
        this.setState({
            password: text
        })
    }

    onPress_Confirm = () => {
        let { ok, message } = checkFields({ password: this.state.password });
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
            Keyboard.dismiss();
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                isVisible={true}
                onModalHide={this.props.onModalHide}
            >
                <View style={styles.topContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <SVG.EditPassword style={styles.icon} width={"100%"} height={"100%"} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Please enter your password before proceeding with bla bla</Text>
                        </View>
                    </View>
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.passwordInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_Password}
                            placeholder="Password"
                            value={this.state.password}
                            margin={Metrics.marginHorizontal}
                            autoCapitalize="none"
                            secureTextEntry={true} />
                    </View>
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
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text="Confirm"
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Confirm} />
                    </View>
                </SafeAreaView>

            </SlidingUpModal>
        );
    }

}

PasswordConfirmationModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onPasswordConfirmed: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

PasswordConfirmationModal.defaultProps = {
    onModalHide: () => { }
}

export default PasswordConfirmationModal;