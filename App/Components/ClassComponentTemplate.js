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
import { Colors, Fonts, Metrics, Theme } from '../Themes'

class ClassComponentTemplate extends Component {

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

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(Theme.c)
        return (
            <View style={styles.container}>
                {/* BUTTON */}
                <TouchableOpacity onPress={this.onPress_Button}>
                    <Text>Press</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default connect()(ClassComponentTemplate);