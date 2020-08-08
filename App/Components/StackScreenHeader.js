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
 * @classdesc Header to use for screens in the StackNavigators, shows back button and title
 */
class StackScreenHeader extends Component {

    // *** RENDER METHODS *** //

    renderLeft = (styles) => {
        return (
            <TouchableOpacity style={styles.backImageContainer} onPress={() => this.props.navigation.goBack()}>
                <Image source={themed.image(Images.leftArrow)} style={styles.backImage} />
            </TouchableOpacity>
        )
    }

    renderMiddle = (styles) => {
        return (
            <Text style={styles.stackTitleText}>{localized.text(this.props.title)}</Text>
        )
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
                    {/* {this.renderRight(styles)} */}
                </View>
            </>
        )
    }

    render() {
        let styles = getStyles(themed.color)
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

StackScreenHeader.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object
}

StackScreenHeader.defaultProps = {

}

export default connect(mapStateToProps)(StackScreenHeader);