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
import ScreenWrapper from "../Components/ScreenWrapper"
import Button from "../../../Components/Button"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import getStyles from "../Styles/UnverifiedUserStyles"
import { Colors, Theme } from '../../../Themes'
import { TextNames, LanguageCodes } from "../../../I18n/languages/Names";
import { LocalizationActions } from "../../../Redux/LocalizationRedux";
import { ThemeActions } from "../../../Redux/ThemeRedux"
import { ThemeModes, getColorMode } from "../../../Themes/Theme";
import validate from "validate.js";

class UnverifiedUserScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** EVENT HANDLERS *** //

    onPress_Signout = () => {
        this.props.signout()
    }

    // *** RENDER METHODS *** //

    render() {
        let user = this.props.auth.candidateUser
        if (user == null || validate.isEmpty(user.displayName)) return null;

        let styles = getStyles(Theme.c)
        return (
            <ScreenWrapper
                topContainerContent={
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={styles.helloText}>{"Hello, " + user.displayName}</Text>
                            <Text style={styles.message}>Your account is created!</Text>
                            <Text style={styles.message}>We have sent you an e-mail with a verification link. Please verify your e-mail address and come back to discover the app!</Text>
                        </View>
                    </>
                }
                topButtonComponent={
                    <Button
                        text={I18n.t(TextNames.signout)}
                        textColor={Theme.c(Colors.textOnLightBackground_dm)}
                        onPress={this.onPress_Signout}
                        backgroundColor={Theme.c(Colors.lightBackground_dm)}
                    />
                }
                transparentButtonComponent={null}
            />
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    signout: () => dispatch(AuthActions.signOutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedUserScreen);