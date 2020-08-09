// Packages
import React, { Component } from "react"
import { connect } from "react-redux";

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Animated
} from "react-native"

// Components
import SettingsButton from "../Components/SettingsButton"

// Actions
import { LocalizationActions } from "../../../Localization/Redux/LocalizationRedux"
import { ThemeActions } from "../../../Theming/Redux/ThemeRedux"

// Utils
import { Texts, localized, LocaleTypes } from "../../../Localization";

// Styles
import getStyles from "../Styles/PreferencesStyles"
import { Colors, themed, ThemeModes } from '../../../Theming'
import { SVG } from "../../../StylingConstants";

/**
 * A screen that renders the user preferences like theme and locale
 */
class PreferencesScreen extends Component {

    state = {
        isVisible_DeviceThemeInfo: false,
        isVisible_DeviceLocaleInfo: false,
        themeMaxHeight: new Animated.Value(0),
        localeMaxHeight: new Animated.Value(0)

    }

    // *** CONVENIENCE METHODS *** //

    // Toggles the visibility of the info component
    // 'type': either 'theme' or 'locale'
    toggleInfoVisibility = (type) => {

        // Show or hide the component in an animated way,
        // If it was hidden, show it by increasing the maxHeight of the component's container from 0 to 500
        // If it was shown, hide it by decreasing the maxHeight from 500 to 0
        // 500 is an arbitrary high number that is apparently greater than the component's container's original height.

        if (type == "theme") {
            this.setState({
                isVisible_DeviceThemeInfo: !this.state.isVisible_DeviceThemeInfo
            }, () => {
                Animated.timing(
                    this.state.themeMaxHeight,
                    {
                        toValue: this.state.isVisible_DeviceThemeInfo ? 500 : 0,
                        duration: 300
                    }
                ).start()
            })
        }
        else if (type == "locale") {
            this.setState({
                isVisible_DeviceLocaleInfo: !this.state.isVisible_DeviceLocaleInfo
            }, () => {
                Animated.timing(
                    this.state.localeMaxHeight,
                    {
                        toValue: this.state.isVisible_DeviceLocaleInfo ? 500 : 0,
                        duration: 300
                    }
                ).start()
            })
        }
    }

    // *** EVENT HANDLERS *** //

    // Change the theme to the selected option using Theme redux action
    onPress_ThemeMode = (themeMode) => {
        this.props.changeThemeRequest(themeMode)
    }

    // Change the locale to the selected option using Locale redux action
    onPress_LocaleType = (localeType) => {
        this.props.changeLocaleRequest(localeType)
    }

    // *** RENDER METHODS *** //

    // Renders the theme options
    renderThemes = () => {

        // The little info icon to the right of the 'device' option
        // Make it a close icon if the info message is shown at the moment
        let infoIcon = this.state.isVisible_DeviceThemeInfo ? SVG.XCircle : SVG.Info;

        // Iterate through the theme modes and render each
        return Object.entries(ThemeModes).map((themeMode, index) => {
            // [0] is the property name and [1] is the property value

            let selected = themeMode[1] == this.props.theme.themeMode;

            return (
                <SettingsButton
                    key={themeMode[0]}
                    text={localized.text(Texts[themeMode[0] + "Theme"])}
                    onPress={() => this.onPress_ThemeMode(themeMode[1])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected}
                    // Show the end info icon only if this is the 'device' option
                    endIcon={themeMode[1] == ThemeModes.device ? infoIcon : null}
                    onPressEndIcon={() => this.toggleInfoVisibility("theme")} />
            )
        })
    }

    // Renders the locale options
    renderLocales = () => {

        // The little info icon to the right of the 'device' option
        // Make it a close icon if the info message is shown at the moment
        let infoIcon = this.state.isVisible_DeviceLocaleInfo ? SVG.XCircle : SVG.Info;

        // Iterate through the locale types and render each
        return Object.entries(LocaleTypes).map((localeType, index) => {
            // [0] is the property name and [1] is the property value

            let selected = localeType[1] == this.props.locale.localeType;

            return (
                <SettingsButton
                    key={localeType[0]}
                    text={localized.text(Texts[localeType[0] + "Locale"])}
                    onPress={() => this.onPress_LocaleType(localeType[1])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected}
                    // Show the end info icon only if this is the 'device' option
                    endIcon={localeType[1] == LocaleTypes.device ? infoIcon : null}
                    onPressEndIcon={() => this.toggleInfoVisibility("locale")} />
            )
        })
    }

    // Renders the info about the option 'device'
    renderInfo = (type) => {
        let styles = getStyles(themed.color)

        // Get the translated info messages
        let deviceThemeInfo = localized.text(Texts.deviceThemeInfo);
        let deviceLocaleInfo = localized.text(Texts.deviceLocaleInfo);

        let info = type == "theme" ? deviceThemeInfo : deviceLocaleInfo;
        let maxHeight = type == "theme" ? this.state.themeMaxHeight : this.state.localeMaxHeight

        // Show an info component with an animated view, using maxHeight styling property
        return (
            <Animated.View style={[styles.infoContainer, { maxHeight }]}>
                <Text style={styles.infoText}>{info}</Text>
            </Animated.View>
        )
    }

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContentContainer} bounces={false}>

                    {/* Screen Title */}
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitleText}>{localized.text(Texts.preferences)}</Text>
                    </View>

                    {/* Theme Preferences */}
                    <View style={styles.settingsContainer}>
                        <Text style={styles.sectionHeader}>{localized.text(Texts.themePreference)}</Text>
                        {this.renderThemes()}
                    </View>
                    {this.renderInfo("theme")}

                    {/* Language Preferences */}
                    <View style={styles.settingsContainer}>
                        <Text style={styles.sectionHeader}>{localized.text(Texts.languagePreference)}</Text>
                        {this.renderLocales()}
                    </View>
                    {this.renderInfo("locale")}
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
})

const mapDispatchToProps = dispatch => ({
    changeLocaleRequest: (localeType) => dispatch(LocalizationActions.changeLocaleRequest({ localeType })),
    changeThemeRequest: (themeMode) => dispatch(ThemeActions.changeThemeRequest({ themeMode }))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);