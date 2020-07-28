import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {
        backgroundColor: c(Colors.lightBackground_dm),
        flexGrow: 1
    },
    headerContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: Metrics.marginHorizontalLarge,
        paddingTop: Metrics.marginVertical
    },
    headerText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: c(Colors.brandColor),
    },
    textinputsContainer: {
        paddingVertical: Metrics.width * 0.04,
    },
    textinputContainer: {
        paddingVertical: Metrics.width * 0.02,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    errorTextContainer:{
        height: Metrics.buttonHeight,
        paddingHorizontal: Metrics.marginHorizontalLarge,
        justifyContent: "flex-end"
    } ,
    errorText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.brandColor),
        paddingHorizontal: 5,
    },
    bottomContainer: {
        backgroundColor: c(Colors.lightGrey_dm),
    },
    topButtonContainer: {
        paddingTop: Metrics.width * 0.06,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    transparentButtonContainer: {
        alignItems: "center",
        paddingBottom: Metrics.width * 0.04
    },
})

export default getStyles