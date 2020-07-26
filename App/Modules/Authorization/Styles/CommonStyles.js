import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {
        backgroundColor: c(Colors.lightBackground_dm),
        flexGrow: 1
    },
    bottomContainer: {
        backgroundColor: c(Colors.lightGrey_dm),
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