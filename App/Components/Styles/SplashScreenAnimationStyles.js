import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange",
    },
    image: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        resizeMode: "cover",
    }
})