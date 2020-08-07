import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = (c) => StyleSheet.create({
    topContainer: {
        marginHorizontal: Metrics.marginHorizontal,
        marginTop: Metrics.width * 0.01
    },
    bottomContainer: {
        backgroundColor: c(Colors.lightGrey_dm),
    },
    buttonContainer: {
        flexDirection: "row",
        padding: Metrics.marginHorizontal,
    },
    errorTextContainer:{
        height: Metrics.buttonHeight / 1.25,      
        justifyContent: "flex-end",
        paddingBottom: Metrics.width * 0.02,
        backgroundColor: c(Colors.lightBackground_dm)
    } ,
    errorText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.brandColor),
    },
})

export default getStyles