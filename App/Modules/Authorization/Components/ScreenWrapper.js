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
 * @augments {Component<Props>}
 */
class ScreenWrapper extends Component {

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer} 
                        onStartShouldSetResponder={() => true}>
                    {this.props.header}
                    <ScrollView
                        bounces={false}
                        style={{flex:0.75}}
                        contentContainerStyle={{flexGrow:1, justifyContent: "flex-end"}}
                        keyboardShouldPersistTaps={"always"}>
                        {this.props.topContainerContent}
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    {this.props.errorContent}
                    <View style={styles.topButtonContainer}>
                        {this.props.topButtonComponent}
                    </View>
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
    topContainerContent: PropTypes.element,
    errorContent: PropTypes.element,
    topButtonComponent: PropTypes.element,
    transparentButtonComponent: PropTypes.element
}

export default ScreenWrapper;