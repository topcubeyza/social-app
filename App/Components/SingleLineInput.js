// Packages
import React, { Component } from "react"
import { View, Text, TextInput, Animated } from "react-native"
import PropTypes from "prop-types"

// Styles
import getStyles from "./Styles/SingleLineInputStyles"
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, themed } from "../Theming"


class SingleLineInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            underlinePadding: new Animated.Value(Metrics.screenWidth - Metrics.marginHorizontalLarge * 2)
        }

    }

    // *** REF METHODS *** //

    isFocused = () => {
        return this.textInput && this.textInput.isFocused()
    }

    drawUnderline = () => {
        Animated.timing(
            this.state.underlinePadding,
            {
                toValue: 0,
                duration: 300
            }
        ).start()
    }

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

    getModifiedStyles = (styles) => {
        let props = this.props;
        return {
            container: [
                styles.container,
                props.backgroundColor ? { backgroundColor: props.backgroundColor }: null
            ],
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

    onFocus = () => {
        this.drawUnderline();
        this.props.onFocus()
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        let { container, underlineContainer, underline } = this.getModifiedStyles(styles)
        return (
            <View style={container}>
                <TextInput
                    {...this.props}
                    ref={ref => this.textInput = ref}
                    onFocus={this.onFocus}
                    style={styles.input}
                    placeholderTextColor={themed.color(Colors.midGrey_dm)}>
                </TextInput>
                <Animated.View style={underlineContainer}>
                    <View style={underline}></View>
                </Animated.View>
            </View>
        )
    }
}

export default SingleLineInput

SingleLineInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    onFocus: PropTypes.func,
    backgroundColor: PropTypes.string
}

SingleLineInput.defaultProps = {
    secureTextEntry: false,
    editable: true,
    onFocus: () => { },
    backgroundColor: "transparent"
}