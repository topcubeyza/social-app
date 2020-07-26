import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

const getStyles = (c) => StyleSheet.create({
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

export default getStyles