import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../StylingConstants"
import { Colors } from '../../Theming'

const getStyles = (c) => StyleSheet.create({
    container: {
        height: Metrics.buttonHeight,
        //alignItems: "center",
        borderTopStartRadius: Metrics.borderRadiusStandard,
        borderTopEndRadius: Metrics.borderRadiusStandard,
        // justifyContent: "space-between"
    },
    input: {
        color: c(Colors.black_dm),
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
        margin: 1,
        marginLeft: Metrics.width * 0.03,
        height: Metrics.buttonHeight - Metrics.horizontalLineHeight,
        // backgroundColor: "pink"
    },
    underlineContainer: {
        backgroundColor: "transparent",
    },
    underline: {
        height: Metrics.horizontalLineHeight,
    }
})

export default getStyles