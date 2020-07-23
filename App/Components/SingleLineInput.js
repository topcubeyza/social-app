import React, { Component } from "react"
import { View, Text, TextInput, Animated } from "react-native"
import PropTypes from "prop-types"
import _ from "lodash"

import styles from "./Styles/SingleLineInputStyles"
import { Colors, Metrics } from "../Themes"


class SingleLineInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            underlinePadding: new Animated.Value(Metrics.screenWidth - Metrics.marginHorizontalLarge * 2)
        }
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

    onFocus = () => {
        this.drawUnderline();
        this.props.onFocus()
    }

    applyCustomStyles = () => {
        let props = this.props;

        return {
            container: [
                styles.container,
                {backgroundColor: props.backgroundColor}
            ],
            underlineContainer: [
                styles.underlineContainer,
                {paddingRight: this.state.underlinePadding}
            ],
            underline: [
                styles.underline,
                {backgroundColor: props.underline}
            ]
        }
    }

    render() {
        let { container, underlineContainer, underline } = this.applyCustomStyles()
        return (
            <View style={container}>
                <TextInput
                    {...this.props}
                    onFocus={this.onFocus}
                    style={styles.input}
                    placeholderTextColor={Colors.midGrey}>
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
    onFocus: () => {},
    backgroundColor: "transparent",
    underline: Colors.brandColor
}