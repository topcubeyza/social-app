import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        height: Metrics.buttonHeight,
        //alignItems: "center",
        borderRadius: Metrics.borderRadiusStandard,
    },
    input: {
        color: "black",
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.sixteen
    },
    underlineContainer: {
        backgroundColor: "transparent",
    },
    underline: {
        height: Metrics.horizontalLineHeight,
    }
})