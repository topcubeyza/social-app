// Packages
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import PropTypes from "prop-types"

// Styles
import getStyles from "./Styles/ButtonStyles"
import { Theme } from "../Themes"


const Button = (props) => {
    let styles = getStyles(Theme.c)
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

Button.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
}

Button.defaultProps = {
    disabled: false,
    onPress: () => {}
}

export default Button