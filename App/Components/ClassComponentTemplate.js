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
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, themed } from '../Theming'

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
        let styles = getStyles(themed.color)
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