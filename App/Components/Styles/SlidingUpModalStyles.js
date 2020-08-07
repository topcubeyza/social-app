import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../StylingConstants"
import { Colors } from '../../Theming'

const getStyles = (c) => StyleSheet.create({
    container: {
        borderTopEndRadius: Metrics.borderRadiusStandard * 2,
        borderTopStartRadius: Metrics.borderRadiusStandard * 2,
        backgroundColor: c(Colors.lightBackground_dm),
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: c(Colors.lightOverlayColor),
        borderRadius: Metrics.borderRadiusStandard * 2,
    },
    lottie: {
        width: Metrics.width * 0.2,
        height: Metrics.width * 0.2
    }
})

export default getStyles