import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'
import getCommonStyles from "./CommonStyles"

const getStyles = c => StyleSheet.create({
    ...getCommonStyles(c),
    messageContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    helloText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 1.5,
        color: c(Colors.brandColor),
    },
    message: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.sixteen,
        paddingTop: Metrics.width * 0.03,
        color: c(Colors.textOnLightBackground_dm),
        textAlign: "center",
        lineHeight: Fonts.size.twenty
    }
})

export default getStyles