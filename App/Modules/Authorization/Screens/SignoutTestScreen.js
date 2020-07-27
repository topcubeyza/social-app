// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import I18n from "react-native-i18n"
import { Appearance } from "react-native-appearance"

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import Button from "../../../Components/Button"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Utils
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";

// Styles
import getStyles from "../Styles/LoginStyles"
import { Colors, Theme } from '../../../Themes'
import { TextNames } from "../../../I18n/languages/Names";

class SignoutTestScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, "user", data => data == null);
        switch (cause) {
            case UpdateCauses.success:
                this.props.navigation.navigate("SignedOut");
                break;
            default:
                break;
        }
    }

    // *** EVENT HANDLERS *** //

    onPress_Signout = () => {
        this.props.signout()
    }

    onPress_Back = () => {
        this.props.navigation.goBack()
    }

    // *** RENDER METHODS *** //
    
    render() {
        let styles = getStyles(Theme.c)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.bemagineText}>Bemagine</Text>
                        <Text style={styles.subText}>{I18n.t(TextNames.welcomeMessage)}</Text>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.bottomButtonContainer}>
                        <Button
                            text={I18n.t(TextNames.signout)}
                            textColor={Theme.c(Colors.textOnLightBackground_dm)}
                            onPress={this.onPress_Signout}
                            backgroundColor={Theme.c(Colors.lightBackground_dm)}
                        />
                    </View>
                    <View style={styles.transparentButtonContainer}>
                        <Button
                            text={I18n.t(TextNames.back)}
                            textColor={Theme.c(Colors.midLightGrey_dm)}
                            onPress={this.onPress_Back}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    signout: () => dispatch(AuthActions.signOutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignoutTestScreen);