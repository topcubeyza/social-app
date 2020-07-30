import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        height: Metrics.headerHeight,
        flexDirection: "row",
        paddingLeft: 50,
    },
    leftContainer: {
        flex: 0.2,
        paddingLeft: Metrics.marginHorizontal,
        justifyContent: "center",
        // backgroundColor: "pink",
    },
    middleContainer: {
        flex: 0.6,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "lightgreen"
    },
    rightContainer: {
        flex: 0.2,
        paddingRight: Metrics.marginHorizontal,
        alignItems: "flex-end",
        justifyContent: "center",
        // backgroundColor: "lightblue"
    },
    backImageContainer: {
        alignItems: "flex-start",
        paddingVertical: Metrics.width * 0.015
    },
    backImage: {
        height: "100%",
        aspectRatio: 0.5,
        resizeMode: "contain",
    },
    titleText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 1.3,
        color: c(Colors.textOnLightBackground_dm),
    },
    rightText: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
        color: c(Colors.midGrey_dm),
        lineHeight: Fonts.size.twenty * 1.6
    },
})

export default getStyles;