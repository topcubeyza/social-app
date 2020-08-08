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
import { Texts, localized, LocaleTypes } from "../../../Localization";

// Styles
import getStyles from "../Styles/PreferencesStyles"
import { Colors, themed, ThemeModes } from '../../../Theming'
import { SVG } from "../../../StylingConstants";

class PreferencesScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** CONVENIENCE METHODS *** //

    // *** EVENT HANDLERS *** //

    onPress_ThemeMode = (themeMode) => {

    }

    onPress_LocaleType = (localeType) => {

    }

    // *** RENDER METHODS *** //

    renderThemes = () => {
        return Object.entries(ThemeModes).map((themeMode, index) => {
            let selected = themeMode[0] == this.props.theme.themeMode;
            return (
                <SettingsButton
                    text={themeMode[0]}
                    onPress={() => this.onPress_ThemeMode(themeMode[0])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected} />
            )
        })
    }

    renderLocales = () => {
        return Object.entries(LocaleTypes).map((localeType, index) => {
            let selected = localeType[0] == this.props.locale.localeType;
            return (
                <SettingsButton
                    text={localeType[0]}
                    onPress={() => this.onPress_LocaleType(localeType[0])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected} />
            )
        })
    }

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <View style={styles.screenTitleContainer}>
                    <Text style={styles.screenTitleText}>{localized.text(Texts.preferences)}</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionHeader}>{localized.text(Texts.themePreference)}</Text>
                    {this.renderThemes()}
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionHeader}>{localized.text(Texts.languagePreference)}</Text>
                    {this.renderLocales()}
                </View>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);