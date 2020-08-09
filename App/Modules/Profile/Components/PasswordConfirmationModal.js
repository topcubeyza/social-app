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
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/PasswordConfirmationModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * @augments {Component<Props>}
 */
class PasswordConfirmationModal extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            password: "",
            errorMessage: "",
        }

        this.state = {...this.initialState}

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

    onModalHide = () => {
        this.props.onModalHide();
        this.setState({...this.initialState})
    }

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

    reauthenticateUser = () => {
        let email = this.props.user.email;
        let password = this.state.password;

        FirebaseApi.reauthenticate({ email, password })
            .then(result => {
                this.setState({
                    loading: false
                }, () => {
                    this.props.onPasswordConfirmed();
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                }, () => {
                    this.showErrorMessage(error);
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onChangeText_Password = (text) => {
        this.setState({
            password: text
        })
    }

    onPress_Proceed = () => {
        let { ok, message } = checkFields({ password: this.state.password });
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
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
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <SVG.EditPassword style={styles.icon} width={"100%"} height={"100%"} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{localized.text(Texts.passwordConfirmMessage)}</Text>
                        </View>
                    </View>
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
    isVisible: PropTypes.bool.isRequired,
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