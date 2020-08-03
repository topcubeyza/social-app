import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../StylingConstants"
import { Colors } from '../../Theming'

const getStyles = (c) => StyleSheet.create({
    container: {
        height: Metrics.buttonHeight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Metrics.borderRadiusStandard,
    },
    text: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.sixteen,
    }
})

export default getStyles