// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import I18n from "react-native-i18n"

// RN Components
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from "react-native"

// Components

// Actions
import { LocalizationActions } from "../Redux/LocalizationRedux"

// Utils

// Styles
import getStyles from "./Styles/SignedOutHeaderStyles"
import { Colors, Fonts, Metrics, Theme, Images } from '../Themes'
import { LanguageCodes } from "../I18n/languages/Names"

class SignedOutHeader extends Component {

    constructor(props) {
        super(props);
    }

    // *** LIFECYCLE METHODS *** //

    // *** CALLBACKS *** //

    // *** REF METHODS *** //

    // *** CONVENIENCE METHODS *** //

    // *** EVENT HANDLERS *** //
    onPress_Button = () => {

    }

    toggleLocale = () => {
        let currentLocale = I18n.currentLocale().substring(0, 2)
        let newLocale = currentLocale == LanguageCodes.english ? LanguageCodes.turkish : LanguageCodes.english
        this.props.changeLocale(newLocale)
    }

    // *** RENDER METHODS *** //

    renderLeft = (styles) => {
        if (this.props.showLeft) {
            return (
                <TouchableOpacity style={styles.backImageContainer} onPress={() => this.props.navigation.goBack()}>
                    <Image source={Theme.i(Images.leftArrow)} style={styles.backImage} />
                </TouchableOpacity>
            )
        }
    }

    renderMiddle = (styles) => {
        if (this.props.showTitle) {
            return (
                <Text style={styles.titleText}>{this.props.title}</Text>
            )
        }
    }

    renderRight = (styles) => {
        if (this.props.showRight) {
            return (
                <TouchableOpacity style={styles.backImageContainer} onPress={this.toggleLocale}>
                    <Text style={styles.rightText}>{I18n.currentLocale().substring(0, 2).toUpperCase()}</Text>
                </TouchableOpacity>

            )
        }
    }

    renderChildren = (styles) => {
        return (
            <>
                <View style={styles.leftContainer}>
                    {this.renderLeft(styles)}
                </View>
                <View style={styles.middleContainer}>
                    {this.renderMiddle(styles)}
                </View>
                <View style={styles.rightContainer}>
                    {this.renderRight(styles)}
                </View>
            </>
        )
    }

    render() {
        let styles = getStyles(Theme.c)
        if (Platform.OS == "ios") {
            return (
                <SafeAreaView style={styles.containerSafeArea}>
                    <View style={styles.containerIOS}>
                        {this.renderChildren(styles)}
                    </View>
                </SafeAreaView>
            )
        }
        else {
            return (
                <View style={styles.containerAndroid}>
                    {this.renderChildren(styles)}
                </View>
            )
        }
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    changeLocale: languageCode => dispatch(LocalizationActions.changeLocaleRequest({ languageCode })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignedOutHeader);