import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors, Theme } from '../../../Themes'

const getStyles = (c) => StyleSheet.create({
    modal: {
        backgroundColor: c(Colors.overlayColor),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: Metrics.marginHorizontalLarge
    },
    container: {
        justifyContent: "center",
        backgroundColor: c(Colors.lightBackground_dm),
        borderRadius: Metrics.borderRadiusStandard
    },
    titleContainer: {
        paddingVertical: Metrics.width * 0.05,
        paddingHorizontal: Metrics.width * 0.05,
        // borderBottomColor: c(Colors.midLightGrey_dm),
        // borderBottomWidth: Metrics.horizontalLineHeight,
        alignItems: "flex-start"
    },
    title: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
        color: c(Colors.textOnLightBackground_dm)
    },
    messageContainer: {
        // paddingTop: Metrics.width * 0.01,
        paddingBottom: Metrics.width * 0.05,
        paddingHorizontal: Metrics.width * 0.05,
        alignItems: "flex-start",
    },
    message: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.sixteen,
        color: c(Colors.textOnLightBackground_dm)
    },
    buttonsContainer: {
        flexDirection: "row-reverse",
        paddingVertical: Metrics.width * 0.01,
        paddingHorizontal: Metrics.width * 0.05,
        justifyContent: "center",
        backgroundColor: c(Colors.lightGrey_dm),
        borderBottomEndRadius: Metrics.borderRadiusStandard,
        borderBottomStartRadius: Metrics.borderRadiusStandard,
    },
    button: {
        flex:1,
        paddingVertical: Metrics.width * 0.02,
        alignItems: "center",
    },
    buttonTextPositive: {
        fontSize: Fonts.size.eighteen,
        fontFamily: Fonts.type.bold,
        color: c(Colors.brandColor)
    },
    buttonTextNegative: {
        fontSize: Fonts.size.eighteen,
        fontFamily: Fonts.type.bold,
        color: c(Colors.midGrey_dm)
    }
})

export default getStyles