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
import _ from "lodash";
import val from "validate.js"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Components
import Button from "../Components/Button"
import SingleLineInput from "../Components/SingleLineInput"

// Styles
import styles from "./Styles/SignupStyles"
import { Colors, Fonts } from '../Themes'
import { duration } from "moment";

class SignupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            keyboardVisible: false,
            brandNameFontSize: new Animated.Value(Fonts.size.twenty * 2),
            signupErrorMessage: ""
        }

        this.constraints = {
            from: {
                email: true
            }
        };

        this.textinputs = {}
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow)
        this.keyboardDidHideListeneer = Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide)
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListeneer.remove();
    }

    onKeyboardDidShow = () => {
        if (!this.state.keyboardVisible) {
            this.setState({
                keyboardVisible: true
            })
        }
    }

    onKeyboardDidHide = () => {
        if (this.state.keyboardVisible) {
            this.setState({
                keyboardVisible: false,
            })
            Object.entries(this.textinputs).map(entry => {
                if (entry[1] != null) {
                    entry[1].removeUnderline()
                }
            })
        }
    }

    onChangeEmail = (text) => {
        this.setState({
            email: text
        })
    }

    onChangePassword = (text) => {
        this.setState({
            password: text
        })
    }

    onChangePasswordConfirm = (text) => {
        this.setState({
            passwordConfirm: text
        })
    }

    onSignupPress = () => {
        let {ok, message} = this.checkSignupInfo()
        if (!ok) {
            this.setState({
                signupErrorMessage: message
            }, () => {
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

    onLoginPress = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onLoginInsteadPress = () => {
        this.props.navigation.navigate("Login");
    }

    onTextInputFocus = (key) => {

        Object.entries(this.textinputs).map(entry => {
            if (entry[0] != key && entry[1] != null) {
                entry[1].removeUnderline()
            }
        })
        
        if (this.state.keyboardVisible) return;

        Animated.timing(
            // Animate value over time
            this.state.brandNameFontSize, // The value to drive
            {
                toValue: Fonts.size.twenty * 1.5,
                duration: 200 // Animate to final value of 1
            }
        ).start()
    }

    onBackgroundPress = () => {
        if (!this.state.keyboardVisible) return;
        Keyboard.dismiss();
        Animated.timing(
            // Animate value over time
            this.state.brandNameFontSize, // The value to drive
            {
                toValue: Fonts.size.twenty * 2,
                duration: 200 // Animate to final value of 1
            }
        ).start()
    }

    checkSignupInfo = () => {

        let { email, password, passwordConfirm } = this.state

        if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(passwordConfirm)) {
            return {
                ok: false,
                message: "Please fill all fields."
            };
        }
        if (password !== passwordConfirm) {
            return {
                ok: false,
                message: "Passwords do not match."
            };
        }
        if (val({ from: email }, this.constraints)) {
            return {
                ok: false,
                message: "Please enter a valid e-mail address."
            };
        }

        return {
            ok: true
        };
    }

    render() {
        let signupButtonDisabled = !this.checkSignupInfo().ok
        return (

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={this.onBackgroundPress}>
                    <View style={styles.container}>
                        <SafeAreaView style={styles.topContainer}>
                            <View style={styles.headerContainer}>
                                    <Animated.Text
                                    style={[styles.headerText, { fontSize: this.state.brandNameFontSize }]}>Signup</Animated.Text>
                            </View>
                            <View style={styles.textinputsContainer}>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.email = ref}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        key="email"
                                        onFocus={() => this.onTextInputFocus("email")}
                                        placeholder={"E-mail"}
                                        value={this.state.email}
                                        onChangeText={this.onChangeEmail}
                                    />
                                </View>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.password = ref}
                                        autoCapitalize="none"
                                        key="password"
                                        onFocus={() => this.onTextInputFocus("password")}
                                        placeholder={"Password"}
                                        value={this.state.password}
                                        onChangeText={this.onChangePassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.textinputContainer}>
                                    <SingleLineInput
                                        ref={ref => this.textinputs.passwordconfirm = ref}
                                        autoCapitalize="none"
                                        key="passwordconfirm"
                                        onFocus={() => this.onTextInputFocus("passwordconfirm")}
                                        placeholder={"Confirm Password"}
                                        value={this.state.passwordConfirm}
                                        onChangeText={this.onChangePasswordConfirm}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.errorTextContainer}>
                                    {
                                        this.state.signupErrorMessage ?
                                        <Text style={styles.errorText}>{this.state.signupErrorMessage}</Text>
                                        : null
                                    }
                                </View>
                            </View>
                        </SafeAreaView>
                        <SafeAreaView style={styles.bottomContainer}>
                            <View style={styles.signupButtonContainer}>
                                <Button
                                    text="Sign up"
                                    textColor={Colors.textOnBrandColor}
                                    onPress={this.onSignupPress}
                                    backgroundColor={Colors.brandColor}
                                />
                            </View>
                            <View style={styles.forgotPassContainer}>
                                <Button
                                    text="Login instead?"
                                    textColor={Colors.midLightGrey_dm}
                                    onPress={this.onLoginInsteadPress}
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