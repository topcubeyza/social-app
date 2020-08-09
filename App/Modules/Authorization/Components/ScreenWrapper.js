// Packages
import React, { Component } from "react"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from "react-native"


// Styles
import getStyles from "../Styles/CommonStyles"
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors, themed } from '../../../Theming'

/**
 * A wrapper component that has the basic layout for the screens in the Authorization Module
 * @augments {Component<Props>}
 */
class ScreenWrapper extends Component {

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                {/* The top part has a different background color than the bottom part. */}
                <SafeAreaView style={styles.topContainer}
                    onStartShouldSetResponder={() => true}>
                    {/* Header */}
                    {this.props.header}
                    {/* The top container content will be rendered inside this scroll view */}
                    <ScrollView
                        bounces={false}
                        style={{ flex: 0.75 }}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
                        keyboardShouldPersistTaps={"always"}>
                        {this.props.topContainerContent}
                    </ScrollView>
                </SafeAreaView>
                {/* The bottom part */}
                <SafeAreaView style={styles.bottomContainer}>
                    {/* The error message */}
                    {this.props.errorContent}
                    {/* This is the main button of the screen */}
                    <View style={styles.topButtonContainer}>
                        {this.props.topButtonComponent}
                    </View>
                    {/* This is the secondary button that has a transparent background, looks like a link text */}
                    <View style={styles.transparentButtonContainer}>
                        {this.props.transparentButtonComponent}
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

ScreenWrapper.propTypes = {
    header: PropTypes.element,
    /** The content that is rendered on the top area */
    topContainerContent: PropTypes.element,
    /** The error message component */
    errorContent: PropTypes.element,
    /** The main button component that is rendered on the top of the bottom area (different background color) */
    topButtonComponent: PropTypes.element,
    /** The secondary button component that is rendered just below the main button.*/
    transparentButtonComponent: PropTypes.element
}

export default ScreenWrapper;