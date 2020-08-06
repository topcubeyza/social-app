import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: c(Colors.lightBackground_dm),
        paddingHorizontal: Metrics.marginHorizontal
    },
    messageContainer: {
        flex: 0.6,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Metrics.width * 0.06,
    },
    buttonsContainer: {
        flex: 0.4,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: Metrics.width * 0.06,
        // backgroundColor: "pink"
    },
    buttonContainer: {
        flex:0.48,
        flexDirection: "row",
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