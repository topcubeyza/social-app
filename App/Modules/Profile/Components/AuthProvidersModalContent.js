// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    Keyboard
} from "react-native"

// Components
import SingleLineInputBackground from "../../../Components/SingleLineInputBackground"
import Button from "../../../Components/Button"
import ErrorMessage from "../../../Components/ErrorMessage"

// Actions

// Utils
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/AuthProvidersModalContentStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 *  A component that renders a ui for the user to reauthenticate herself with her password
 * @augments {Component<Props>}
 */
class AuthProvidersModalContent extends Component {

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.topContainer}>
                {/* The part that shows an explanatory message to user */}
                <View style={styles.infoContainer}>
                    <View style={styles.iconContainer}>
                        <SVG.EditPassword style={styles.icon} width={"100%"} height={"100%"} />
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{localized.text(Texts.reauthenticationMessage)}</Text>
                    </View>
                </View>
                <SafeAreaView style={styles.bottomContainer}>

                    {/* Proceed with google */}
                    {
                        this.props.hasGoogleProvider ?
                            <View style={styles.buttonContainer}>
                                <Button
                                    backgroundColor={themed.color(Colors.googleColor)}
                                    text={localized.text(Texts.confirmWithGoogle)}
                                    textColor={themed.color(Colors.textOnLightBackground_dm)}
                                    onPress={this.props.onPress_ReauthenticateWithGoogle} />
                            </View>
                            : null
                    }

                    {/* Proceed with password */}
                    {
                        this.props.hasEmailProvider ?
                            <View style={styles.buttonContainer}>
                                <Button
                                    backgroundColor={themed.color(Colors.brandColor)}
                                    text={localized.text(Texts.confirmWithPassword)}
                                    textColor={themed.color(Colors.textOnBrandColor)}
                                    onPress={this.props.onPress_ReauthenticateWithPassword} />
                            </View>
                            : null
                    }
                </SafeAreaView>
            </View>
        );
    }

}

AuthProvidersModalContent.propTypes = {
    hasGoogleProvider: PropTypes.bool.isRequired,
    hasEmailProvider: PropTypes.bool.isRequired,
    onPress_ReauthenticateWithGoogle: PropTypes.func.isRequired,
    onPress_ReauthenticateWithPassword: PropTypes.func.isRequired,
}

AuthProvidersModalContent.defaultProps = {
}

export default AuthProvidersModalContent;