import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../StylingConstants"
import { Colors } from '../../Theming'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default getStyles;