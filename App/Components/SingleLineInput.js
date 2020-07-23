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
        console.log("removing underline")
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
        _.isNil(this.props.onFocus) ? null : this.props.onFocus()
    }

    render() {
        let props = this.props
        let containerStyle = [
            styles.container,
            { backgroundColor: props.backgroundColor }];
        let textStyle = [
            styles.text,
            { color: props.textColor }];
        return (
            <View style={styles.container}>
                <TextInput
                    {...props}
                    onFocus={this.onFocus}
                    style={styles.input}
                    placeholderTextColor={Colors.midGrey}>
                </TextInput>
                <Animated.View style={[styles.underlineContainer, {paddingRight: this.state.underlinePadding}]}>
                    <View style={[styles.underline, { backgroundColor: props.underlineColor ? props.underlineColor : Colors.brandColor }]}></View>
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
    onFocus: PropTypes.func
}