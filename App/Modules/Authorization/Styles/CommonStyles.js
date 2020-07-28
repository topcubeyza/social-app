import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

const getStyles = c => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {
        backgroundColor: c(Colors.lightBackground_dm),
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
})

export default getStyles