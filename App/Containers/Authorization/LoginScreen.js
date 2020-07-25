// Packages
import React, { Component } from "react"
import {
    View,
    Text,
    SafeAreaView
} from "react-native"
import { connect } from "react-redux";

// Actions
import { AuthActions } from "../../Redux/AuthRedux"

// Components
import Button from "../../Components/Button"

// Styles
import getStyles from "./Styles/LoginStyles"
import { Colors } from '../../Themes'
import { themed } from "../../Themes/ThemeManager";

class LoginScreen extends Component {

    onLoginPress = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onSignupPress = () => {
        this.props.navigation.navigate("Signup")
    }

    onForgotPasswordPress = () => {
        this.props.theme.setTheme(this.props.theme.mode == 'dark' ? 'light' : 'dark')
    }

    render() {
        let color = this.props.theme.color;
        let styles = getStyles(color)
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
                                textColor={color(Colors.textOnDarkBackground)}
                                onPress={this.onLoginPress}
                                backgroundColor={color(Colors.googleColor)}
                            />
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text="Login with Email"
                                textColor={color(Colors.textOnBrandColor)}
                                onPress={this.onLoginPress}
                                backgroundColor={color(Colors.brandColor)}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.signupButtonContainer}>
                        <Button
                            text="Sign up"
                            textColor={color(Colors.textOnLightBackground_dm)}
                            onPress={this.onSignupPress}
                            backgroundColor={color(Colors.lightBackground_dm)}
                        />
                    </View>
                    <View style={styles.forgotPassContainer}>
                        <Button
                            text="Forgot Password?"
                            textColor={color(Colors.midLightGrey_dm)}
                            onPress={this.onForgotPasswordPress}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

export default themed(LoginScreen);