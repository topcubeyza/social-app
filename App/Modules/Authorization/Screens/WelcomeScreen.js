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
import { Colors, Theme } from '../../../Themes'
import { TextNames, LanguageCodes } from "../../../I18n/languages/Names";
import { LocalizationActions } from "../../../Redux/LocalizationRedux";
import { ThemeActions } from "../../../Redux/ThemeRedux"
import { ThemeModes, getColorMode } from "../../../Themes/Theme";

class WelcomeScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        if (this.props.auth.user) {
            this.props.navigation.navigate("SignedIn")
        }
    }

    // *** EVENT HANDLERS *** //

    onPress_Login = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onPress_LoginWithEmail = () => {
        this.props.navigation.navigate("LoginWithEmail")
    }

    onPress_Signup = () => {
        this.props.navigation.navigate("Signup")
    }

    onPress_ForgotPassword = () => {
        let colorMode = getColorMode(this.props.theme.themeMode)

        this.props.changeTheme(colorMode == 'dark' ? 'light' : 'dark')

        let currentLocale = I18n.currentLocale().substring(0,2)
        let newLocale = currentLocale == LanguageCodes.english ? LanguageCodes.turkish : LanguageCodes.english
        this.props.changeLocale(newLocale)
    }

    // *** RENDER METHODS *** //
    
    render() {
        let styles = getStyles(Theme.c)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.bemagineText}>Bemagine</Text>
                        <Text style={styles.subText}>{I18n.t(TextNames.welcomeMessage)}</Text>
                    </View>
                    <View style={styles.loginButtonsContainer}>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text={I18n.t(TextNames.loginWithGoogle)}
                                textColor={Theme.c(Colors.textOnDarkBackground)}
                                onPress={this.onPress_Login}
                                backgroundColor={Theme.c(Colors.googleColor)}
                            />
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text={I18n.t(TextNames.loginWithEmail)}
                                textColor={Theme.c(Colors.textOnBrandColor)}
                                onPress={this.onPress_LoginWithEmail}
                                backgroundColor={Theme.c(Colors.brandColor)}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.bottomButtonContainer}>
                        <Button
                            text={I18n.t(TextNames.signup)}
                            textColor={Theme.c(Colors.textOnLightBackground_dm)}
                            onPress={this.onPress_Signup}
                            backgroundColor={Theme.c(Colors.lightBackground_dm)}
                        />
                    </View>
                    <View style={styles.transparentButtonContainer}>
                        <Button
                            text={I18n.t(TextNames.forgotPassword)}
                            textColor={Theme.c(Colors.midLightGrey_dm)}
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
    locale: state.locale,
    theme: state.theme,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    changeLocale: languageCode => dispatch(LocalizationActions.changeLocaleRequest({languageCode})),
    changeTheme: themeMode => dispatch(ThemeActions.changeThemeRequest({themeMode}))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);