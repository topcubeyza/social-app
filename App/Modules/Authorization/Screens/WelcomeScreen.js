// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { Appearance } from "react-native-appearance"

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import ScreenWrapper from "../Components/ScreenWrapper"
import Button from "../../../Components/Button"

// Actions
import { AuthActions } from "../Redux/AuthRedux"
import { LocalizationActions } from "../../../Localization/Redux/LocalizationRedux";
import { ThemeActions } from "../../../Theming/Redux/ThemeRedux"

// Utils
import { Texts, localized, LocaleTypes } from "../../../Localization";

// Styles
import getStyles from "../Styles/WelcomeStyles"
import { Colors, themed, ThemeModes, getColorMode } from '../../../Theming'
import Firebase from "../../../Services/Firebase";

/**
 * The firstmost screen that a user sees, presenting options of signin and signup
 */
class WelcomeScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** EVENT HANDLERS *** //

    onPress_Google = () => {
        Firebase.signInWithGoogle();
    }

    onPress_Login = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onPress_LoginWithEmail = () => {
        this.props.navigation.navigate("LoginWithEmail")
    }

    onPress_Signup = () => {
        this.props.navigation.navigate("Signup")
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <ScreenWrapper
                topContainerContent={
                    <>
                    {/* Giant Welcome Message */}
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.bemagineText}>Bemagine</Text>
                            <Text style={styles.subText}>{localized.text(Texts.welcomeMessage)}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            {/* Login with Google */}
                            <View style={styles.buttonContainer}>
                                <Button
                                    text={localized.text(Texts.loginWithGoogle)}
                                    textColor={themed.color(Colors.textOnDarkBackground)}
                                    onPress={this.onPress_Google}
                                    backgroundColor={themed.color(Colors.googleColor)}
                                />
                            </View>
                            {/* Login with Email */}
                            <View style={styles.buttonContainer}>
                                <Button
                                    text={localized.text(Texts.loginWithEmail)}
                                    textColor={themed.color(Colors.textOnBrandColor)}
                                    onPress={this.onPress_LoginWithEmail}
                                    backgroundColor={themed.color(Colors.brandColor)}
                                />
                            </View>
                        </View>
                    </>
                }
                topButtonComponent={
                    // Signup Button
                    <Button
                        text={localized.text(Texts.signup)}
                        textColor={themed.color(Colors.textOnLightBackground_dm)}
                        onPress={this.onPress_Signup}
                        backgroundColor={themed.color(Colors.lightBackground_dm)}
                    />
                }
                transparentButtonComponent={
                    // Providing button component with no text
                    // To allow for some padding on the bottom
                    <Button
                        text={""}
                        textColor={themed.color(Colors.midLightGrey_dm)}
                        backgroundColor={"transparent"}
                    />
                }
            />
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    changeLocale: languageCode => dispatch(LocalizationActions.changeLocaleRequest({ languageCode })),
    changeTheme: themeMode => dispatch(ThemeActions.changeThemeRequest({ themeMode }))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);