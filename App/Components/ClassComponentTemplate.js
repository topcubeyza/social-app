// Packages
import React, { Component } from "react"
import {connect} from "react-redux"

// RN Components
import {
    View,
    TouchableOpacity,
    Text
} from "react-native"

// Components

// Actions

// Utils

// Styles
import getStyles from "./Styles/TemplateStyles"
import { Colors, Fonts, Metrics } from '../../Themes'
import { ThemeContext } from "../Themes/ThemeManager"

class ClassComponentTemplate extends Component {

    constructor(props) {
        super(props);
    }

    static contextType = ThemeContext

    // *** LIFECYCLE METHODS *** //

    // *** CALLBACKS *** //

    // *** REF METHODS *** //

    // *** CONVENIENCE METHODS *** //

    // *** EVENTS *** //

    // *** RENDER METHODS *** //

    render() {
        let color = this.context.color
        let styles = getStyles(color)
        return (
            <View style={styles.container}>
                {/* BUTTON */}
                <TouchableOpacity onPress={this._onPressButton}>
                    <Text>Press</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default connect()(ClassComponentTemplate);