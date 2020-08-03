import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'
import getCommonStyles from "./CommonStyles"

const getStyles = c => StyleSheet.create({
    ...getCommonStyles(c),
    buttonsContainer: {
        paddingVertical: Metrics.width * 0.04,
    },
    buttonContainer: {
        paddingVertical: Metrics.width * 0.02,
    },
    welcomeContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeTextsContainer: {
        alignItems: "center",
        paddingVertical: Metrics.marginVertical,
        borderRadius: Metrics.borderRadiusStandard,
    },
    bemagineText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: c(Colors.brandColor),
    }
})

export default getStyles