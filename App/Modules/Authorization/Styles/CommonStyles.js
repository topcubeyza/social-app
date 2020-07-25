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
    transparentButtonContainer: {
        alignItems: "center",
        paddingBottom: Metrics.width * 0.04
    },
})

export default getStyles