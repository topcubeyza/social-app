import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: c(Colors.lightBackground_dm),
        paddingHorizontal: Metrics.marginHorizontal
    },
    infoContainer: {
        // backgroundColor: "pink",
        paddingTop: Metrics.marginVertical,
        borderBottomColor: c(Colors.midLightGrey_dm),
        borderBottomWidth: 1,
        paddingBottom: Metrics.width * 0.075
    },
    displayNameText: {
        color: c(Colors.textOnLightBackground_dm),
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.twentytwo,
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
        borderBottomColor: c(Colors.midLightGrey_dm),
        borderBottomWidth: 1
    },
    sectionHeader: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.midGrey_dm),
        paddingBottom: Metrics.width * 0.03
    },
    seriousActionsContainer: {
        paddingTop: Metrics.width * 0.05,
    }
})

export default getStyles