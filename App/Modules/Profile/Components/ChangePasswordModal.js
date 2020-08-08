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
import getStyles from "../Styles/ChangePasswordModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * @augments {Component<Props,State>}
 */
class ChangePasswordModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordConfirm: "",
            errorMessage: "",
            loading: false
        }

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

    changePassword = () => {
        let newPassword = this.state.password;

        FirebaseApi.changePassword({ newPassword })
            .then(() => {
                this.setState({
                    loading: false
                }, () => {
                    this.props.onPasswordChanged();
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

    onChangeText_PasswordConfirm = (text) => {
        this.setState({
            passwordConfirm: text
        })
    }

    onPress_Confirm = () => {
        let { ok, message } = checkFields({ password: this.state.password, passwordConfirm: this.state.passwordConfirm });
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
            Keyboard.dismiss();
            this.setState({
                loading: true
            }, () => {
                this.changePassword();
            })
        }
    }

    onFocus_Password = () => {
        this.passwordConfirmInput.removeUnderline()
    }

    onFocus_PasswordConfirm = () => {
        this.passwordInput.removeUnderline();
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                isVisible={this.props.isVisible}
                onModalHide={this.props.onModalHide}
                loading={this.state.loading}
            >
                <View style={styles.topContainer}>
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
    isVisible: PropTypes.bool.isRequired,
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