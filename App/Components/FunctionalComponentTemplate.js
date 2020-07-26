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
import { Colors, Fonts, Metrics, Theme } from '../Themes'

const FunctionalComponentTemplate = props => {

    let styles = getStyles(Theme.c)

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