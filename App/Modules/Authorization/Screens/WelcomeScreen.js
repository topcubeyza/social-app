// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import I18n from "react-native-i18n"

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import Button from "../../../Components/Button"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import getStyles from "../Styles/LoginStyles"
import { Colors, ThemeContext } from '../../../Themes'
import { TextNames } from "../../../I18n/languages/Names";

class WelcomeScreen extends Component {

    static contextType = ThemeContext

    // *** EVENT HANDLERS *** //

    onPress_Login = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onPress_Signup = () => {
        this.props.navigation.navigate("Signup")
    }

    onPress_ForgotPassword = () => {
        this.context.setTheme(this.context.mode == 'dark' ? 'light' : 'dark')
        I18n.locale("tr")
    }

    // *** RENDER METHODS *** //
    
    render() {
        let color = this.context.color;
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
                                text={I18n.t(TextNames.loginWithGoogle)}
                                textColor={color(Colors.textOnDarkBackground)}
                                onPress={this.onPress_Login}
                                backgroundColor={color(Colors.googleColor)}
                            />
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text={I18n.t(TextNames.loginWithEmail)}
                                textColor={color(Colors.textOnBrandColor)}
                                onPress={this.onPress_Login}
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
                            onPress={this.onPress_Signup}
                            backgroundColor={color(Colors.lightBackground_dm)}
                        />
                    </View>
                    <View style={styles.transparentButtonContainer}>
                        <Button
                            text="Forgot Password?"
                            textColor={color(Colors.midLightGrey_dm)}
                            onPress={this.onPress_ForgotPassword}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

export default WelcomeScreen;