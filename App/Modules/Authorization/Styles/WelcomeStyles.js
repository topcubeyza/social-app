import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'
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
    subText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        paddingLeft: Metrics.width * 0.038,
        paddingTop: Metrics.width * 0.03,
        color: c(Colors.textOnLightBackground_dm)
    },
    bemagineText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: c(Colors.brandColor),
    }
})

export default getStyles