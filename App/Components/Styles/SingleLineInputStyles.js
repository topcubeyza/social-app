import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

const getStyles = (c) => StyleSheet.create({
    container: {
        height: Metrics.buttonHeight,
        //alignItems: "center",
        borderRadius: Metrics.borderRadiusStandard,
        justifyContent: "flex-end",
    },
    input: {
        color: c(Colors.black_dm),
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.sixteen,
        marginBottom: 1
    },
    underlineContainer: {
        backgroundColor: "transparent",
    },
    underline: {
        height: Metrics.horizontalLineHeight,
    }
})

export default getStyles