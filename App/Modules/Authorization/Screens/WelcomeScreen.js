// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import I18n from "react-native-i18n"
import { Appearance } from "react-native-appearance"

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
import { TextNames, LanguageCodes } from "../../../I18n/languages/Names";
import { LocalizationActions } from "../../../Redux/LocalizationRedux";
import { ThemeModes } from "../../../Themes/Colors";
import { getColor } from "../../../Themes/ThemeManager"

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
        let colorMode = this.context.themeMode;
        if (colorMode == ThemeModes.device) {
            colorMode = Appearance.getColorScheme();
        }

        this.context.setTheme(colorMode == 'dark' ? 'light' : 'dark')
        let currentLocale = I18n.currentLocale().substring(0,2)
        this.props.changeLocale(currentLocale == LanguageCodes.english ? LanguageCodes.turkish : LanguageCodes.english)
    }

    // *** RENDER METHODS *** //
    
    render() {
        let color = getColor;
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

const mapStateToProps = state => ({
    locale: state.locale
})

const mapDispatchToProps = dispatch => ({
    changeLocale: languageCode => dispatch(LocalizationActions.changeLocaleRequest({languageCode}))
})

export default connect(null, mapDispatchToProps)(WelcomeScreen);