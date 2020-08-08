import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: c(Colors.lightBackground_dm),
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    imageContainer: {
        flexGrow: 0.5,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Metrics.width * 0.1
    },
    image: {
        height: Metrics.width * 0.4,
        resizeMode: "contain"
    },
    textsContainer: {
        flexGrow: 0.5,
        alignItems: "center",
    },
    helloText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty,
        paddingBottom: Metrics.width * 0.02,
        color: c(Colors.black_dm),
        textAlign: "center"
    },
    subText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.textOnLightBackground_dm),
        textAlign: "center"
    },
    gobackButtonContainer: {
        flexDirection: "row",
        paddingBottom: Metrics.marginHorizontalLarge
    }
})

export default getStyles