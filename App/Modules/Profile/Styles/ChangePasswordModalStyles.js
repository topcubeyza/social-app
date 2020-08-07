import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'
import getCommonStyles from "./CommonStyles"

const getStyles = (c) => StyleSheet.create({
    ...getCommonStyles(c),
    textinputContainer: {
        paddingBottom: Metrics.width * 0.05,
    },
    topContainer: {
        marginHorizontal: Metrics.marginHorizontal,
        marginTop: Metrics.width * 0.075
    },
})

export default getStyles