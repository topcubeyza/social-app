import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    lottie: {
        width: Metrics.width * 0.2,
        height: Metrics.width * 0.2
    },
})

export default getStyles