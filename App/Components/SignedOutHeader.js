// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

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
import { LocalizationActions } from "../Localization/Redux/LocalizationRedux"

// Utils
import { LocaleTypes, localized, getCurrentLocale } from "../Localization"

// Styles
import getStyles from "./Styles/HeaderStyles"
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, Images, themed } from '../Theming'

/**
 * @augments {Component<Props>}
 * @classdesc Header to use for screens in the SignedOutNavigation, i.e. Authorization screens
 */
class SignedOutHeader extends Component {

    // *** EVENT HANDLERS *** //

    // toggle locales between turkish and english
    toggleLocale = () => {
        let currentLocale = getCurrentLocale()
        let newLocale = currentLocale == LocaleTypes.english ? LocaleTypes.turkish : LocaleTypes.english
        this.props.changeLocale(newLocale)
    }

    // *** RENDER METHODS *** //

    // renders a back button on the left
    renderLeft = (styles) => {
        if (this.props.showLeft) {
            return (
                <TouchableOpacity style={styles.backImageContainer} onPress={() => this.props.navigation.goBack()}>
                    <Image source={themed.image(Images.leftArrow)} style={styles.backImage} />
                </TouchableOpacity>
            )
        }
    }

    // renders the title
    renderMiddle = (styles) => {
        if (this.props.showTitle) {
            return (
                <Text style={styles.titleText}>{localized.text(this.props.title)}</Text>
            )
        }
    }

    // renders a button on the right to toggle locale
    renderRight = (styles) => {
        if (this.props.showRight) {
            return (
                <TouchableOpacity style={styles.backImageContainer} onPress={this.toggleLocale}>
                    <Text style={styles.rightText}>{getCurrentLocale().toUpperCase()}</Text>
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
        let styles = getStyles(themed.color)

        // Header renders differently in ios and android
        // The below structure renders the same in both platforms
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

SignedOutHeader.propTypes = {
    showLeft: PropTypes.bool,
    showTitle: PropTypes.bool,
    showRight: PropTypes.bool,
    title: PropTypes.string,
    navigation: PropTypes.object,
}

SignedOutHeader.defaultProps = {
    showLeft: false,
    showTitle: false,
    showRight: false 
}

// Consuming locale and theme to immediately respond to changes in them
const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme
})

// Uses changeLocale to toggle the locale with the right button
const mapDispatchToProps = dispatch => ({
    changeLocale: localeType => dispatch(LocalizationActions.changeLocaleRequest({ localeType })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignedOutHeader);
