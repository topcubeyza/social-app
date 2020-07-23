import React from "react"
import { TouchableOpacity, Text } from "react-native"
import PropTypes from "prop-types"

import styles from "./Styles/ButtonStyles"


const Button = (props) => {
    let containerStyle = [
        styles.container, 
        { backgroundColor: props.backgroundColor }];
    let textStyle = [
        styles.text, 
        { color: props.textColor }];
    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={containerStyle}
            onPress={props.onPress}>
            <Text style={textStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Button

Button.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}