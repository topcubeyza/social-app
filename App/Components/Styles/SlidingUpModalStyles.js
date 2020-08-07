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
    }
})

export default getStyles