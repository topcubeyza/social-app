// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import validate from "validate.js"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Linking
} from "react-native"

// Components
import Button from "../../../Components/Button"

// Actions

// Utils
import { Texts, localized } from "../../../Localization";

// Styles
import getStyles from "../Styles/HomeStyles"
import { Colors, themed } from '../../../Theming'

/**
 * The home screen for a signed in user 
 */
class HomeScreen extends Component {

    // *** EVENT HANDLERS *** //

    onPress_LinkedinProfile = () => {
        Linking.openURL('https://www.linkedin.com/in/beyza-topçu')
    }

    onPress_GithubRepo = () => {
        Linking.openURL('https://github.com/topcubeyza/social-app')
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        let user = this.props.auth.user
        if (user == null || validate.isEmpty(user.displayName)) return null;
        return (
            <View style={styles.container}>
                {/* Information about app and developer */}
                <View style={styles.messageContainer}>
                    <Text style={styles.helloText}>{localized.text(Texts.welcomeToApp)}</Text>
                    <Text style={styles.message}>{localized.text(Texts.noteFromDeveloper)}</Text>
                    <Text style={styles.message}>{localized.text(Texts.appExplanation)}</Text>
                    <Text style={styles.message}>Beyza Topçu</Text>
                </View>
                {/* Buttons to visit github repo of the app and linkedin account of the developer */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.githubColor)}
                            text="Github"
                            textColor={themed.color(Colors.textOnDarkBackground)}
                            onPress={this.onPress_GithubRepo} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.linkedinColor)}
                            text="LinkedIn"
                            textColor={themed.color(Colors.textOnDarkBackground)}
                            onPress={this.onPress_LinkedinProfile} />
                    </View>
                </View>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);