// Packages
import React, { Component } from "react"
import { connect } from "react-redux";

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import SettingsButton from "../Components/SettingsButton"

// Actions
import { AuthActions } from "../../Authorization/Redux/AuthRedux"

// Utils
import { Texts, localized } from "../../../Localization";

// Styles
import getStyles from "../Styles/ProfileStyles"
import { Colors, themed } from '../../../Theming'
import { SVG } from "../../../StylingConstants";
import validate from "validate.js";

class ProfileScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** EVENT HANDLERS *** //

    onPress_EditName = () => {

    }

    onPress_ChangePassword = () => {

    }

    onPress_Signout = () => {
        this.props.signoutRequest();
    }

    onPress_DeleteAccount = () => {

    }

    // *** RENDER METHODS *** //

    render() {
        if (validate.isEmpty(this.props.user)) return null;
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.displayNameText}>{this.props.user.displayName}</Text>
                    <Text style={styles.emailText}>{this.props.user.email}</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionHeader}>{localized.text(Texts.profileSettings)}</Text>
                    <SettingsButton
                        text={localized.text(Texts.editName)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.Edit} />
                    <SettingsButton
                        text={localized.text(Texts.changePassword)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.EditPassword} />
                </View>
                <View style={styles.seriousActionsContainer}>
                    <SettingsButton
                        text={localized.text(Texts.signout)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        boldText
                        icon={SVG.Logout}
                        onPress={this.onPress_Signout} />
                    <SettingsButton
                        text={localized.text(Texts.deleteAccount)}
                        color={themed.color(Colors.brandColor)}
                        boldText
                        icon={SVG.Trash} />
                </View>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    signoutRequest: () => dispatch(AuthActions.signOutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);