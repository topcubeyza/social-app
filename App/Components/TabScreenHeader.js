// Packages
import React, { Component } from "react"
import { connect } from "react-redux"

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
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, Images, themed } from '../Theming'

class TabScreenHeader extends Component {

    // *** RENDER METHODS *** //

    renderLeft = (styles) => {
        return (
            <TouchableOpacity style={styles.logoContainer} onPress={() => this.props.navigation.navigate("Home")}>
                <Image source={themed.image(Images.logoOrange)} style={styles.logoImage} />
            </TouchableOpacity>
        )
    }

    renderRight = (styles) => {
        return (
            <TouchableOpacity style={styles.profileImageContainer} onPress={() => this.props.navigation.navigate("Profile")}>
                <Image source={themed.image(Images.iconProfile)} style={styles.profileImage} />
            </TouchableOpacity >

        )
    }

    renderChildren = (styles) => {
        return (
            <>
                <View style={styles.leftContainer}>
                    {this.renderLeft(styles)}
                </View>
                <View style={styles.middleContainer}>
                    {/* {this.renderMiddle(styles)} */}
                </View>
                <View style={styles.rightContainer}>
                    {this.renderRight(styles)}
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

export default connect(mapStateToProps)(TabScreenHeader);