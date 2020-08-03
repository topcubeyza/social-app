import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    lottie: {
        width: Metrics.width * 0.2,
        height: Metrics.width * 0.2
    },
})

export default getStyles