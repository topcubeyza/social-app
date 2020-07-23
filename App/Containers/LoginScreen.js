// Packages
import React, { Component } from "react"
import {
    View,
    Text,
    SafeAreaView
} from "react-native"
import { connect } from "react-redux";

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Components
import Button from "../Components/Button"

// Styles
import styles from "./Styles/LoginStyles"
import { Colors } from '../Themes'

class LoginScreen extends Component {

    onLoginPress = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onSignupPress = () => {
        this.props.navigation.navigate("Signup")
    }

    onForgotPasswordPress = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.bemagineText}>Bemagine</Text>
                        <Text style={styles.subText}>Where imagination meets hardwork</Text>
                    </View>
                    <View style={styles.loginButtonsContainer}>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text="Login with Google"
                                textColor={Colors.textOnDarkBackground}
                                onPress={this.onLoginPress}
                                backgroundColor={Colors.googleColor}
                            />
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text="Login with Email"
                                textColor={Colors.textOnBrandColor}
                                onPress={this.onLoginPress}
                                backgroundColor={Colors.brandColor}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.signupButtonContainer}>
                        <Button
                            text="Sign up"
                            textColor={Colors.textOnLightBackground_dm}
                            onPress={this.onSignupPress}
                            backgroundColor={Colors.lightBackground_dm}
                        />
                    </View>
                    <View style={styles.forgotPassContainer}>
                        <Button
                            text="Forgot Password?"
                            textColor={Colors.midLightGrey_dm}
                            onPress={this.onForgotPasswordPress}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

export default LoginScreen;