import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = c => StyleSheet.create({
    errorText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.brandColor),
    },
}