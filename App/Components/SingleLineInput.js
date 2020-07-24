import React, { Component } from "react"
import { View, Text, TextInput, Animated } from "react-native"
import PropTypes from "prop-types"
import _ from "lodash"

import getStyles from "./Styles/SingleLineInputStyles"
import { Colors, Metrics } from "../Themes"
import { themed } from "../Themes/ThemeManager"


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

    applyCustomStyles = (styles) => {
        let props = this.props;
        let color = props.theme.color
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
                {backgroundColor: props.underline ? props.underline : color(Colors.brandColor)}
            ]
        }
    }

    render() {
        let styles = getStyles(this.props.theme.color)
        let { container, underlineContainer, underline } = this.applyCustomStyles(styles)
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

export default themed(SingleLineInput)

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
    backgroundColor: "transparent"
}