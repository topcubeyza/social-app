import { StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: c(Colors.lightBackground_dm),
    },
    topContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        marginHorizontal: Metrics.marginHorizontalLarge
    },
    headerContainer: {
        flex:0.25,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingVertical: Metrics.marginHorizontalLarge,
    },
    headerText: {
        fontFamily: Fonts.type.brand,
        fontSize: Fonts.size.twenty * 3,
        color: c(Colors.brandColor),
    },
    textinputsContainer: {
        marginBottom: 1
    },
    textinputContainer: {
        paddingTop: Metrics.width * 0.02,
    },
    errorTextContainer:{
        height: Metrics.buttonHeight / 1.25,
        paddingHorizontal: Metrics.marginHorizontalLarge,        
        justifyContent: "flex-end",
        paddingBottom: Metrics.width * 0.02,
        backgroundColor: c(Colors.lightBackground_dm)
    } ,
    errorText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        color: c(Colors.brandColor),
    },
    bottomContainer: {
        backgroundColor: c(Colors.lightGrey_dm),
    },
    topButtonContainer: {
        paddingTop: Metrics.width * 0.06,
        paddingHorizontal: Metrics.marginHorizontalLarge
    },
    transparentButtonContainer: {
        alignItems: "center",
        paddingBottom: Metrics.width * 0.04
    },
    subText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.fourteen,
        paddingLeft: Metrics.width * 0.038,
        paddingTop: Metrics.width * 0.03,
        color: c(Colors.textOnLightBackground_dm),
        textAlign: "center"
    }
})

export default getStyles