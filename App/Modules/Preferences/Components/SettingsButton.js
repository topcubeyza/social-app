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
    let EndIconComponent = props.endIcon

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
            {
                EndIconComponent ?
                    <TouchableOpacity 
                        onPress={props.onPressEndIcon}
                        style={styles.endIconContainer}>
                        <EndIconComponent
                            style={styles.icon}
                            width={"100%"}
                            height={"100%"} />
                    </TouchableOpacity>
                    : null
            }
        </TouchableOpacity>
    )
}

SettingsButton.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    endIcon: PropTypes.elementType,
    onPressEndIcon: PropTypes.func
}

SettingsButton.defaultProps = {
    onPress: () => { },
}

export default SettingsButton