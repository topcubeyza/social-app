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

/**
 * The component to render a single option on the Preferences Screen
 * @augments {Component<Props>}
 */
const SettingsButton = (props) => {
    let styles = getStyles(themed.color)

    // Modify the styles with the given props
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

            {/* LeftIcon */}
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

            {/* Option Text */}
            <View style={styles.textContainer}>
                <Text style={textStyle}>{props.text}</Text>
            </View>

            {/* Right Icon */}
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
    /** Left icon component type */
    icon: PropTypes.elementType,
    /** Options text */
    text: PropTypes.string.isRequired,
    /** onPress to pass on to Option Touchable */
    onPress: PropTypes.func,
    /** Is the option selected? */
    selected: PropTypes.bool.isRequired,
    /** Right icon component type */
    endIcon: PropTypes.elementType,
    /** onPress to pass on to Touchable of end icon */
    onPressEndIcon: PropTypes.func,
    /** Is this option disabled? Default: false */
    disabled: PropTypes.bool
}

SettingsButton.defaultProps = {
    onPress: () => { },
    disabled: false
}

export default SettingsButton