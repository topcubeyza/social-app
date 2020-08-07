// Packages
import React from "react"
import PropTypes from "prop-types"

// RN Components
import { 
    TouchableOpacity, 
    View,
    Text,
 } from "react-native"

// Styles
import getStyles from "../Styles/SettingsButtonStyles"
import { SVG } from "../../../StylingConstants"
import { themed } from "../../../Theming"


const SettingsButton = (props) => {
    let styles = getStyles(themed.color)
    let textStyle = [
        props.boldText ? styles.textBold : styles.textRegular,
        { color: props.color }];

    let IconComponent = props.icon

    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={styles.container}
            onPress={props.onPress}>
            {
                IconComponent ?
                    <View style={styles.iconContainer}>
                        <IconComponent
                            style={styles.icon}
                            width={"100%"}
                            height={"100%"} />
                    </View>
                    : null
            }
            <View style={styles.textContainer}>
                <Text style={textStyle}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

SettingsButton.propTypes = {
    icon: PropTypes.func,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    boldText: PropTypes.bool
}

SettingsButton.defaultProps = {
    disabled: false,
    onPress: () => { },
    boldText: false
}

export default SettingsButton