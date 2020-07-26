// Packages
import React from "react"

// RN Components
import {
    View,
    TouchableOpacity,
    Text
} from "react-native"

// Components

// Utils

// Styles
import getStyles from "./Styles/TemplateStyles"
import { Colors, Fonts, Metrics, useThemeContext } from '../Themes'
import { getColor } from "../Themes/ThemeManager"

const FunctionalComponentTemplate = props => {

    
    let color = getColor()
    let styles = getStyles(color)

    return (
        <View style={styles.container}>
            {/* BUTTON */}
            <TouchableOpacity onPress={props.onPressButton}>
                <Text>Press</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FunctionalComponentTemplate;