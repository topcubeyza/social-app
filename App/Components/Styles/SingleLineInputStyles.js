import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

const getStyles = (color) => StyleSheet.create({
    container: {
        height: Metrics.buttonHeight,
        //alignItems: "center",
        borderRadius: Metrics.borderRadiusStandard,
    },
    input: {
        color: color(Colors.black_dm),
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

export default getStyles