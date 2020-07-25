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
        color: color(Colors.textOnLightBackground_dm)
    },
    bemagineText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: color(Colors.brandColor),
    }
})

export default getStyles