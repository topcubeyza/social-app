import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Theming'
import getCommonStyles from "./CommonStyles"

const getStyles = (c) => StyleSheet.create({
    ...getCommonStyles(c),
    
    textinputContainer: {
        paddingVertical: Metrics.marginHorizontal,
    },
    topContainer: {
        marginHorizontal: Metrics.marginHorizontal,
        marginTop: Metrics.width * 0.01
    },
    buttonContainer: {
        flexDirection: "row",
        padding: Metrics.marginHorizontal,
    },
    infoContainer: {
        paddingTop: Metrics.marginHorizontal,
        paddingBottom: Metrics.width * 0.025,
        flexDirection: "row",
        // alignItems: "center"
    },
    iconContainer: {
        flex: 0.1,
        height: Fonts.size.eighteen * 1.5,
        marginTop: Metrics.width * 0.01,
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
    errorTextContainer:{
        height: Metrics.buttonHeight / 1.25,      
        justifyContent: "flex-end",
        paddingBottom: Metrics.width * 0.02,
        backgroundColor: c(Colors.lightBackground_dm)
    } ,
})

export default getStyles