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

// Utils
import { Texts, localized } from "../../../Localization";

// Styles
import getStyles from "../Styles/ProfileStyles"
import { Colors, themed } from '../../../Theming'
import { SVG } from "../../../StylingConstants";

class ProfileScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** EVENT HANDLERS *** //

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.displayNameText}>{this.props.user.displayName}</Text>
                    <Text style={styles.emailText}>{this.props.user.email}</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionHeader}>Profile Settings</Text>
                    <SettingsButton 
                        text="Edit Name" 
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.Edit} />
                    <SettingsButton 
                        text="Change Password" 
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.EditPassword} />
                </View>
                <View style={styles.seriousActionsContainer}>
                    <SettingsButton 
                        text="Logout" 
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        boldText
                        icon={SVG.Logout} />
                    <SettingsButton 
                        text="Delete Account" 
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);