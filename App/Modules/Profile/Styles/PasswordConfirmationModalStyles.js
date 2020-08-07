import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'
import getCommonStyles from "./CommonStyles"

const getStyles = (c) => StyleSheet.create({
    ...getCommonStyles(c),
    infoContainer: {
        paddingTop: Metrics.marginHorizontal,
        paddingBottom: Metrics.width * 0.025,
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        flex: 0.1,
        height: Fonts.size.eighteen * 1.5,
        alignItems: "center"
    },
    icon: {
        aspectRatio: 1,
        color: c(Colors.brandColor)
    },
    messageContainer: {
        flex: 0.9,
        justifyContent: "center",
        paddingLeft: Metrics.width * 0.035
    },
    messageText: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
        color: c(Colors.textOnLightBackground_dm),
    },
    reasonText: {
        color: c(Colors.brandColor),
    },
    textinputContainer: {
        paddingVertical: Metrics.marginHorizontal,
    },
})

export default getStyles