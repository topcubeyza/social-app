// Packages
import React, { Component } from "react"
import { connect } from "react-redux";

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import Button from "../../../Components/Button"

// Actions

// Utils
import { Texts, localized } from "../../../Localization";

// Styles
import getStyles from "../Styles/CommonStyles"
import { Colors, themed } from '../../../Theming'

class PreferencesScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    // *** EVENT HANDLERS *** //

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <View><Text>PreferencesScreen</Text></View>
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);