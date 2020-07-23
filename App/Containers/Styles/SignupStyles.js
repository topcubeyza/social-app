import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {
        backgroundColor: Colors.lightBackground,
        flexGrow: 1
    },
    bottomContainer: {
        backgroundColor: Colors.lightGrey,
    },
    signupButtonContainer: {
        paddingTop: Metrics.width * 0.06,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    forgotPassContainer: {
        alignItems: "center",
        paddingBottom: Metrics.width * 0.04
    },
    forgotPassText: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.fourteen,
        color: Colors.midGrey,
    },
    loginButtonsContainer: {
        paddingVertical: Metrics.width * 0.04,
    },
    loginButtonContainer: {
        paddingVertical: Metrics.width * 0.02,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    welcomeContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    welcomeTextsContainer: {
        alignItems: "center",
        paddingVertical: Metrics.marginVertical,
        borderRadius: Metrics.borderRadiusStandard,
    },
    welcomeText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 2,
        marginBottom: Metrics.width * 0.01,
    },
    subText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        paddingLeft: Metrics.width * 0.038,
        paddingTop: Metrics.width * 0.03,
        color: Colors.darkTextColor
    },
    bemagineText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: Colors.brandColor,
    }
})