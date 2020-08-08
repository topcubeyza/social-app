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

// Utils
import { LocaleTypes, localized } from "../Localization"

// Styles
import getStyles from "./Styles/HeaderStyles"
import { Fonts, Metrics, SVG } from "../StylingConstants"
import { Colors, Images, themed } from '../Theming'

/**
 * @augments {Components<Props,State>}
 * @classdesc Header to use for screens in the TabNavigator, shows brand logo and profile icon
 */
class TabScreenHeader extends Component {

    // *** RENDER METHODS *** //

    // renders brand logo on the left with a link to Home screen
    renderLeft = (styles) => {
        return (
            <TouchableOpacity style={styles.logoContainer} onPress={() => this.props.navigation.navigate("Home")}>
                <Image source={themed.image(Images.logoOrange)} style={styles.logoImage} />
            </TouchableOpacity>
        )
    }

    // renders profile icon on the right with a link to Profile screen
    renderRight = (styles) => {
        return (
            <TouchableOpacity style={styles.profileImageContainer} onPress={() => this.props.navigation.navigate("Profile")}>
                <SVG.Profile width={"100%"} height={"100%"} style={styles.profileImage}/>
            </TouchableOpacity >

        )
    }

    renderChildren = (styles) => {
        return (
            <>
                <View style={styles.leftContainer}>
                    {this.renderLeft(styles)}
                </View>
                {/* This part is kept to have the same flex layout among different header components */}
                <View style={styles.middleContainer}>
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

TabScreenHeader.propTypes = {
    navigation: PropTypes.object
}


// Consuming locale and theme to immediately respond to changes in them
const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme
})

export default connect(mapStateToProps)(TabScreenHeader);