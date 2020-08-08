// Packages
import React, { Component } from "react"
import { View, Text, TextInput, Animated, TextInputProps } from "react-native"
import PropTypes from "prop-types"

// Styles
import getStyles from "./Styles/SingleLineInputStyles"
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, themed } from "../Theming"

/**
 * @augments {Component<Props>}
 * @classdesc The component used as TextInput all around the app
 */
class SingleLineInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // controls the animated drawing and removing of underline of the input
            underlinePadding: new Animated.Value(Metrics.screenWidth - Metrics.marginHorizontalLarge * 2)
        }

    }

    // *** REF METHODS *** //

    // used by the parent component
    isFocused = () => {
        return this.textInput && this.textInput.isFocused()
    }

    /**
     * draws a line under input 
     * it works by decreasing the left padding of the underline container
     * the result is an animation that looks like the line is lengthening towards right
     */
    drawUnderline = () => {
        Animated.timing(
            this.state.underlinePadding,
            {
                toValue: 0,
                duration: 300
            }
        ).start()
    }

    /**
     * removes the line under input 
     * it works by increasing the left padding of the underline container
     * the result is an animation that looks like the line is shortening towards left
     */
    removeUnderline = () => {
        Animated.timing(
            this.state.underlinePadding,
            {
                toValue: Metrics.screenWidth - Metrics.marginHorizontalLarge * 2,
                duration: 300
            }
        ).start()
    }

    // *** CONVENIENCE METHODS *** //

    // modifies styles based on props and state
    getModifiedStyles = (styles) => {
        let props = this.props;
        return {
            underlineContainer: [
                styles.underlineContainer,
                { paddingRight: this.state.underlinePadding }
            ],
            underline: [
                styles.underline,
                { backgroundColor: props.underline ? props.underline : themed.color(Colors.brandColor) }
            ]
        }
    }

    // *** EVENTS *** //

    // draws the underline of input when it is focused
    onFocus = () => {
        this.drawUnderline();
        this.props.onFocus()
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        let { container, underlineContainer, underline } = this.getModifiedStyles(styles)
        return (
            <View style={styles.container}>
                {/* Input */}
                <TextInput
                    {...this.props}
                    ref={ref => this.textInput = ref}
                    onFocus={this.onFocus}
                    style={styles.input}
                    placeholderTextColor={themed.color(Colors.midGrey_dm)}>
                </TextInput>
                {/* Underline */}
                <Animated.View style={underlineContainer}>
                    <View style={underline}></View>
                </Animated.View>
            </View>
        )
    }
}

SingleLineInput.propTypes = {
    underline: PropTypes.string,
    onFocus: PropTypes.func,
}

SingleLineInput.defaultProps = {
    underline: null,
    onFocus: () => {},
    editable: true,
}

export default SingleLineInput