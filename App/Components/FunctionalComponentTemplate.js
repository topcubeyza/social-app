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
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, themed } from '../Theming'

const FunctionalComponentTemplate = props => {

    let styles = getStyles(themed.color)

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