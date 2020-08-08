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
import { themed, Colors } from "../../../Theming"


const SettingsButton = (props) => {
    let styles = getStyles(themed.color)
    let textStyle = [
        props.boldText ? styles.textBold : styles.textRegular,
        { color: themed.color(props.selected ? Colors.brandColor : Colors.textOnLightBackground_dm) }
    ]
    let iconStyle = [
        styles.icon,
        { color: themed.color(props.selected ? Colors.brandColor : Colors.midLightGrey_dm) }
    ]

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
                            style={iconStyle}
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
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    selected: PropTypes.bool.isRequired
}

SettingsButton.defaultProps = {
    onPress: () => { },
}

export default SettingsButton