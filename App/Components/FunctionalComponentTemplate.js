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
import { Colors, Fonts, Metrics } from '../../Themes'
import { useThemeContext } from "../Themes/ThemeManager"

const FunctionalComponentTemplate = props => {

    let context = useThemeContext()
    let color = context.color
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