import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'

const getStyles = (c) => StyleSheet.create({
    topContainer: {
        marginHorizontal: Metrics.marginHorizontal,
        marginTop: Metrics.width * 0.01
    },
    infoContainer: {
        paddingTop: Metrics.marginHorizontal,
        paddingBottom: Metrics.width * 0.025,
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        flex: 0.1,
        height: Fonts.size.eighteen * 1.5,
        alignItems: "center"
    },
    icon: {
        aspectRatio: 1,
        color: c(Colors.brandColor)
    },
    messageContainer: {
        flex: 0.9,
        justifyContent: "center",
        paddingLeft: Metrics.width * 0.035
    },
    messageText: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.eighteen,
        color: c(Colors.textOnLightBackground_dm),
    },
    reasonText: {
        color: c(Colors.brandColor),
    },
    textinputContainer: {
        paddingVertical: Metrics.marginHorizontal,
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