import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = (c) => StyleSheet.create({
    container: {
        height: Metrics.buttonHeight * 0.75,
        alignItems: "center",
        flexDirection: "row"
        // backgroundColor: "pink"
    },
    iconContainer: {
        flex: 0.1,
        paddingVertical: Metrics.width * 0.025,
        justifyContent: "flex-start",
        // backgroundColor: "pink"
    },
    icon: {
        // backgroundColor: "green",
        aspectRatio: 1,
    },
    textContainer: {
        flex: 0.9
    },
    textBold: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.sixteen,
    },
    textRegular: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
    }
})

export default getStyles