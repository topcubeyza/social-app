import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c(Colors.lightBackground_dm),
    },
    scrollContentContainer: {
        paddingHorizontal: Metrics.marginHorizontal
    },
    screenTitleContainer: {
        // backgroundColor: "pink",
        paddingTop: Metrics.marginVertical,
    },
    screenTitleText: {
        color: c(Colors.textOnLightBackground_dm),
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.twentysix,
        paddingBottom: Metrics.width * 0.02
    },
    settingsContainer: {
        paddingTop: Metrics.width * 0.075,
        paddingBottom: Metrics.width * 0.05,
    },
    sectionHeader: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.sixteen,
        color: c(Colors.midGrey_dm),
        paddingBottom: Metrics.width * 0.03
    },
    infoContainer: {
        marginTop: Metrics.width * 0.03,
        marginRight: Metrics.marginHorizontal,
        backgroundColor: c(Colors.lightGrey_dm),
        borderRadius: Metrics.borderRadiusStandard,
        padding: Metrics.width * 0.04,
        width: Metrics.screenWidth * 0.73,
        alignSelf: "flex-end",
        flexDirection: "row"
    },
    infoText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.sixteen,
        color: c(Colors.textOnLightBackground_dm),
        textAlign: "right",
        lineHeight: Fonts.size.sixteen
        // backgroundColor: "pink"
    },
})

export default getStyles