// Packages
import React, { Component } from "react"

// RN Components
import {
    View,
    SafeAreaView
} from "react-native"


// Styles
import getStyles from "../Styles/WelcomeStyles"
import { Colors, Theme } from '../../../Themes'

class ScreenWrapper extends Component {

    // *** RENDER METHODS *** //
    
    render() {
        let styles = getStyles(Theme.c)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    {this.props.topContainerContent}
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
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

export default ScreenWrapper;