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
import getStyles from "./Styles/ErrorMessageStyles"
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, themed } from '../Theming'

/**
 * An inline error message
 * @augments {Component<Props>}
 */
class ErrorMessage extends Component {

    this.state = {
        errorMessage: ""
    }

    // *** REF METHODS *** //

    // The method called by parent to show the error message
    showErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        }, () => {
            // Show an error message for two seconds

            // clear timeout so that when this method is called repeatedly,
            // disappearing of error message will be delayed
            if (this.errorMessageTimeout) {
                clearTimeout(this.errorMessageTimeout)
            }
            this.errorMessageTimeout = setTimeout(() => {
                this.setState({
                    errorMessage: ""
                })
            }, 2000);
        })
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        if (this.state.errorMessage) {
            return (
                <Text numberOfLines={2} style={styles.errorText}>{this.state.errorMessage}</Text>
            )
        }

        return null;
    }

}

ErrorMessage.propTypes = {
    /** Use ref to call showErrorMessage(message) */
    ref: PropTypes.func
}

export default ErrorMessage;