// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import I18n from "react-native-i18n";

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Animated,
} from "react-native"

// Components
import Button from "../../../Components/Button"
import SingleLineInput from "../../../Components/SingleLineInput"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Utils
import checkCredentials from "../Utils/CredentialsCheck"
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";

// Styles
import getStyles from "../Styles/SignupStyles"
import { Colors, Fonts, Theme } from '../../../Themes'
import { TextNames } from "../../../I18n/languages/Names";
import { LoadingActions } from "../../../Redux/LoadingRedux";

class SignupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            headerFontSize: new Animated.Value(Fonts.size.twenty * 2),
            signupErrorMessage: ""
        }

        this.textinputs = {}
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

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, "user", data => data != null);
        switch (cause) {
            case UpdateCauses.fetching:
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                this.showErrorMessage(this.props.auth.error)
                this.props.setLoadingMode(false)
                break;
            case UpdateCauses.success:
                this.props.navigation.navigate("SignedIn");
                this.props.setLoadingMode(false)
                break;
            default:
                break;
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

            // When keyboard hides, underline of the active textinput must be removed
            Object.entries(this.textinputs).map(textinput => {
                // checking if the textinput is mounted
                if (textinput[1] != null) {
                    textinput[1].removeUnderline()
                }
            })

            Animated.timing(
                this.state.headerFontSize,
                {
                    toValue: Fonts.size.twenty * 2,
                    duration: 300
                }
            ).start()
        }
    }

    // *** CONVENIENCE METHODS *** //

    showErrorMessage = (message) => {
        this.setState({
            signupErrorMessage: message
        }, () => {
            // Show an error message for two seconds if fields are not valid

            // clear timeout so that when user taps button repeatedly,
            // disappearing of error message will be delayed
            if (this.errorMessageTimeout) {
                clearTimeout(this.errorMessageTimeout)
            }
            this.errorMessageTimeout = setTimeout(() => {
                this.setState({
                    signupErrorMessage: ""
                })
            }, 2000);
        })
    }

    // *** EVENT HANDLERS *** //

    onChangeText = (text, key) => {
        let newState = {}
        newState[key] = text;
        this.setState(newState)
    }

    onPress_Signup = () => {
        let { ok, message } = checkCredentials(this.state)
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
            this.props.createUserRequest({
                email: this.state.email,
                password: this.state.password
            })
        }
    }

    onPress_LoginInstead = () => {
        this.props.navigation.navigate("Welcome");
    }

    // key: key of the textinput
    onFocus_TextInput = (key) => {
        // Remove underline of the previously focused textinput
        Object.entries(this.textinputs).map(entry => {
            if (entry[0] != key && entry[1] != null) {
                entry[1].removeUnderline()
            }
        })

        // If keyboard was not previously visible and it will be shown just in a moment,
        // Shrink the header with animation
        if (!this.keyboardVisible) {
            Animated.timing(
                this.state.headerFontSize,
                {
                    toValue: Fonts.size.twenty * 1.5,
                    duration: 300
                }
            ).start()
        }

    }

    onPress_Background = () => {
        // If keyboard was previously visible and it will be hidden just in a moment,
        // Enlarge the header with animation
        if (!this.keyboardVisible) return;
        Keyboard.dismiss();
    }

    // *** RENDER METHODS *** //

    renderTextInput = (styles, key, placeholder, type) => {
        return (
            <View style={styles.textinputContainer}>
                <SingleLineInput
                    ref={ref => this.textinputs[key] = ref}
                    keyboardType={type == "email" ? "email-address" : "default"}
                    autoCapitalize="none"
                    key={key}
                    onFocus={() => this.onFocus_TextInput(key)}
                    placeholder={placeholder}
                    value={this.state[key]}
                    onChangeText={text => this.onChangeText(text, key)}
                    secureTextEntry={type == "password"}
                />
            </View>
        )
    }

    render() {
        let styles = getStyles(Theme.c)
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={this.onPress_Background}>
                    <View style={styles.container}>
                        <SafeAreaView style={styles.topContainer}>

                            {/* HEADER */}
                            <View style={styles.headerContainer}>
                                <Animated.Text
                                    style={[styles.headerText, { fontSize: this.state.headerFontSize }]}>{I18n.t(TextNames.signup)}</Animated.Text>
                            </View>

                            {/* CREDENTIAL INPUTS */}
                            <View style={styles.textinputsContainer}>
                                {this.renderTextInput(styles, "email", I18n.t(TextNames.email), "email")}
                                {this.renderTextInput(styles, "password", I18n.t(TextNames.password), "password")}
                                {this.renderTextInput(styles, "passwordConfirm", I18n.t(TextNames.confirmPassword), "password")}

                                {/* ERROR MESSAGE */}
                                <View style={styles.errorTextContainer}>
                                    {
                                        this.state.signupErrorMessage ?
                                            <Text style={styles.errorText}>{this.state.signupErrorMessage}</Text>
                                            : null
                                    }
                                </View>
                            </View>
                        </SafeAreaView>

                        {/* BUTTONS */}
                        <SafeAreaView style={styles.bottomContainer}>
                            <View style={styles.bottomButtonContainer}>
                                <Button
                                    text={I18n.t(TextNames.signup)}
                                    textColor={Theme.c(Colors.textOnBrandColor)}
                                    onPress={this.onPress_Signup}
                                    backgroundColor={Theme.c(Colors.brandColor)}
                                />
                            </View>
                            <View style={styles.transparentButtonContainer}>
                                <Button
                                    text={I18n.t(TextNames.loginInstead)}
                                    textColor={Theme.c(Colors.midLightGrey_dm)}
                                    onPress={this.onPress_LoginInstead}
                                    backgroundColor={"transparent"}
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
    createUserRequest: ({ email, password }) => dispatch(AuthActions.createUserRequest({ email, password })),
    setLoadingMode: isLoading => dispatch(LoadingActions.setLoadingMode(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);