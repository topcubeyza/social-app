// Packages
import React, { Component } from "react"
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    LayoutAnimation,
    UIManager
} from "react-native"
import { connect } from "react-redux";
import { duration } from "moment";

// Actions
import { AuthActions } from "../../Redux/AuthRedux"

// Components
import Button from "../../Components/Button"
import SingleLineInput from "../../Components/SingleLineInput"

// Utils
import checkCredentials from "./Utils/CredentialsCheck"

// Styles
import getStyles from "./Styles/SignupStyles"
import { Colors, Fonts } from '../../Themes'
import { ThemeContext } from "../../Themes/ThemeManager";

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

    static contextType = ThemeContext

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
        debugger;
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

// *** EVENTS *** //

    _onChangeTextEmail = (text) => {
        this.setState({
            email: text
        })
    }

    _onChangeTextPassword = (text) => {
        this.setState({
            password: text
        })
    }

    _onChangeTextPasswordConfirm = (text) => {
        this.setState({
            passwordConfirm: text
        })
    }

    _onPressSignup = () => {
        let {ok, message} = checkCredentials(this.state)
        if (!ok) {
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
    }

    _onPressLogin = () => {
        // Navigate to Incomplete page until the login page is designed
        this.props.navigation.navigate("Incomplete")
    }

    _onPressLoginInstead = () => {
        this.props.navigation.navigate("Login");
    }

    // key: key of the textinput
    _onFocusTextInput = (key) => {
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

    _onPressBackground = () => {
        debugger;
        // If keyboard was previously visible and it will be hidden just in a moment,
        // Enlarge the header with animation
        if (!this.keyboardVisible) return;
        Keyboard.dismiss();
    }

// *** RENDER METHODS *** //

    render() {
        let signupButtonDisabled = !checkCredentials(this.state).ok
        let color = this.context.color
        let styles = getStyles(color)
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={this._onPressBackground}>
                    <View style={styles.container}>
                        <SafeAreaView style={styles.topContainer}>
{/* HEADER */}
                            <View style={styles.headerContainer}>
                                    <Animated.Text
                                    style={[styles.headerText, { fontSize: this.state.headerFontSize }]}>Signup</Animated.Text>
                            </View>
{/* CREDENTIAL INPUTS */}
                            <View style={styles.textinputsContainer}>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.email = ref}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        key="email"
                                        onFocus={() => this._onFocusTextInput("email")}
                                        placeholder={"E-mail"}
                                        value={this.state.email}
                                        onChangeText={this._onChangeTextEmail}
                                    />
                                </View>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.password = ref}
                                        autoCapitalize="none"
                                        key="password"
                                        onFocus={() => this._onFocusTextInput("password")}
                                        placeholder={"Password"}
                                        value={this.state.password}
                                        onChangeText={this._onChangeTextPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.passwordconfirm = ref}
                                        autoCapitalize="none"
                                        key="passwordconfirm"
                                        onFocus={() => this._onFocusTextInput("passwordconfirm")}
                                        placeholder={"Confirm Password"}
                                        value={this.state.passwordConfirm}
                                        onChangeText={this._onChangeTextPasswordConfirm}
                                        secureTextEntry={true}
                                    />
                                </View>
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
                            <View style={styles.signupButtonContainer}>
                                <Button
                                    text="Sign up"
                                    textColor={color(Colors.textOnBrandColor)}
                                    onPress={this._onPressSignup}
                                    backgroundColor={color(Colors.brandColor)}
                                />
                            </View>
                            <View style={styles.forgotPassContainer}>
                                <Button
                                    text="Login instead?"
                                    textColor={color(Colors.midLightGrey_dm)}
                                    onPress={this._onPressLoginInstead}
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

export default SignupScreen;