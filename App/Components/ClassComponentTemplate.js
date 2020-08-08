// Packages
import React, { Component } from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

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

/**
 * @augments {Component<Props>}
 */
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

ClassComponentTemplate.propTypes = {

}

ClassComponentTemplate.defaultProps = {
    
}

export default connect()(ClassComponentTemplate);