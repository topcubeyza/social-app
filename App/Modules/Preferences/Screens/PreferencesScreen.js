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
import { TouchableOpacity } from "react-native-gesture-handler";

class PreferencesScreen extends Component {

    state = {
        isVisible_DeviceThemeInfo: false,
        isVisible_DeviceLocaleInfo: false,
        themeMaxHeight: new Animated.Value(0),
        localeMaxHeight: new Animated.Value(0)

    }

    // *** LIFECYCLE METHODS *** //

    // *** CONVENIENCE METHODS *** //

    toggleInfoVisibility = (type) => {
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

    onPress_ThemeMode = (themeMode) => {
        this.props.changeThemeRequest(themeMode)
    }

    onPress_LocaleType = (localeType) => {
        this.props.changeLocaleRequest(localeType)
    }

    // *** RENDER METHODS *** //

    renderThemes = () => {
        let length = Object.entries(ThemeModes).length
        let infoIcon = this.state.isVisible_DeviceThemeInfo ? SVG.XCircle : SVG.Info;

        return Object.entries(ThemeModes).map((themeMode, index) => {
            let selected = themeMode[1] == this.props.theme.themeMode;
            return (
                <SettingsButton
                    key={themeMode[0]}
                    text={localized.text(Texts[themeMode[0] + "Theme"])}
                    onPress={() => this.onPress_ThemeMode(themeMode[1])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected}
                    endIcon={index == length - 1 ? infoIcon : null}
                    onPressEndIcon={() => this.toggleInfoVisibility("theme")} />
            )
        })
    }

    renderLocales = () => {
        let length = Object.entries(LocaleTypes).length
        let infoIcon = this.state.isVisible_DeviceLocaleInfo ? SVG.XCircle : SVG.Info;

        return Object.entries(LocaleTypes).map((localeType, index) => {
            let selected = localeType[1] == this.props.locale.localeType;
            return (
                <SettingsButton
                    key={localeType[0]}
                    text={localized.text(Texts[localeType[0] + "Locale"])}
                    onPress={() => this.onPress_LocaleType(localeType[1])}
                    icon={selected ? SVG.CheckedCircle : SVG.Circle}
                    selected={selected}
                    endIcon={index == length - 1 ? infoIcon : null}
                    onPressEndIcon={() => this.toggleInfoVisibility("locale")} />
            )
        })
    }

    renderInfo = (type) => {
        let styles = getStyles(themed.color)
        let deviceThemeInfo = localized.text(Texts.deviceThemeInfo);
        let deviceLocaleInfo = localized.text(Texts.deviceLocaleInfo);

        let info = type == "theme" ? deviceThemeInfo : deviceLocaleInfo;
        let isVisible = type == "theme" ? this.state.isVisible_DeviceThemeInfo : this.state.isVisible_DeviceLocaleInfo
        let maxHeight = type == "theme" ? this.state.themeMaxHeight : this.state.localeMaxHeight

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
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitleText}>{localized.text(Texts.preferences)}</Text>
                    </View>
                    <View style={styles.settingsContainer}>
                        <Text style={styles.sectionHeader}>{localized.text(Texts.themePreference)}</Text>
                        {this.renderThemes()}
                    </View>
                    {this.renderInfo("theme")}
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