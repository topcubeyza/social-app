import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../StylingConstants"
import { Colors } from '../../Theming'

const getStyles = c => StyleSheet.create({
    containerSafeArea: {
        backgroundColor: c(Colors.lightBackground_dm),
    },
    containerIOS: {
        // flex:1,
        height: Metrics.tabHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: c(Colors.lightGrey_dm),
        borderTopWidth: 1,
    },
    containerAndroid: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: c(Colors.lightBackground_dm),
        height: Metrics.tabHeight,
        flexDirection: "row",
        borderTopColor: c(Colors.lightGrey_dm),
        borderTopWidth: 1,
    },
    tabContainer: {
        flex: 1,
        paddingVertical: Metrics.width * 0.035
    },
    tabIcon: {
        flex: 1,
    }
})

export default getStyles;