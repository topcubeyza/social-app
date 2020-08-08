import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c(Colors.lightBackground_dm),
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
    emailText: {
        color: c(Colors.textOnLightBackground_dm),
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen
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
    seriousActionsContainer: {
        paddingTop: Metrics.width * 0.05,
    }
})

export default getStyles