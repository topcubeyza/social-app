import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

const getStyles = color => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: color(Colors.lightBackground_dm),
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
        color: color(Colors.black_dm)
    },
    subText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: color(Colors.textOnLightBackground_dm)
    },
    gobackButtonContainer: {
        paddingHorizontal: Metrics.marginHorizontalLarge,
        paddingBottom: Metrics.marginHorizontalLarge
    }
})

export default getStyles