import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

const getStyles = color => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {
        backgroundColor: color(Colors.lightBackground_dm),
        flexGrow: 1
    },
    bottomContainer: {
        backgroundColor: color(Colors.lightGrey_dm),
    },
    signupButtonContainer: {
        paddingTop: Metrics.width * 0.06,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    forgotPassContainer: {
        alignItems: "center",
        paddingBottom: Metrics.width * 0.04
    },
    textinputsContainer: {
        paddingVertical: Metrics.width * 0.04,
    },
    textinputContainer: {
        paddingVertical: Metrics.width * 0.02,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    headerContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: Metrics.marginHorizontalLarge,
        paddingTop: Metrics.marginVertical
    },
    errorTextContainer:{
        height: Metrics.buttonHeight / 2,
        paddingHorizontal: Metrics.marginHorizontalLarge,
        justifyContent: "flex-end"
    } ,
    errorText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: color(Colors.brandColor),
        paddingHorizontal: 5,
    },
    headerText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: color(Colors.brandColor),
    }
})

export default getStyles