import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
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