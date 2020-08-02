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
import ScreenWrapper from "../Components/ScreenWrapper"
import Button from "../../../Components/Button"

// Actions
import { AuthActions } from "../Redux/AuthRedux"
import { LoadingActions } from "../../../Redux/LoadingRedux"

// Utils
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";

// Styles
import getStyles from "../Styles/UnverifiedUserStyles"
import { Colors, Theme } from '../../../Themes'
import { TextNames, LanguageCodes } from "../../../I18n/languages/Names";
import { LocalizationActions } from "../../../Redux/LocalizationRedux";
import { ThemeActions } from "../../../Redux/ThemeRedux"
import { ThemeModes, getColorMode } from "../../../Themes/Theme";
import validate from "validate.js";
import { alertContext } from "../../Main/AlertProvider";

class UnverifiedUserScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        }
    }

    static contextType = alertContext

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, "unimportant", () => true);  
        switch (cause) {
            case UpdateCauses.fetching:
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                this.showErrorMessage(this.props.auth.error)
                this.props.setLoadingMode(false)
                break;
            case UpdateCauses.success:
                this.context.show({
                    title: "Success", 
                    message: "We have resent the verification e-mail", 
                    buttons: [{
                        text: "OK",
                        onPress: () => this.context.close()
                    }], 
                    cancellable: true
                })
                this.props.setLoadingMode(false)
                break;
            default:
                break;
        }
    }

    // *** CONVENIENCE METHODS *** //

    showErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        }, () => {
            // Show an error message for two seconds if fields are not valid

            // clear timeout so that when user taps button repeatedly,
            // disappearing of error message will be delayed
            if (this.errorMessageTimeout) {
                clearTimeout(this.errorMessageTimeout)
            }
            this.errorMessageTimeout = setTimeout(() => {
                this.setState({
                    errorMessage: ""
                })
            }, 2000);
        })
    }

    // *** EVENT HANDLERS *** //

    onPress_Signout = () => {
        this.props.signout()
    }

    onPress_ResendVerificatioNEmail = () => {
        this.props.resendVerificationEmailRequest()
    }

    // *** RENDER METHODS *** //

    render() {
        let user = this.props.auth.candidateUser
        if (user == null || validate.isEmpty(user.displayName)) return null;

        let styles = getStyles(Theme.c)
        return (
            <ScreenWrapper
                topContainerContent={
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={styles.helloText}>{I18n.t(TextNames.helloName, { name: user.displayName })}</Text>
                            <Text style={styles.message}>{I18n.t(TextNames.accountCreated)}</Text>
                            <Text style={styles.message}>{I18n.t(TextNames.verifyEmail)}</Text>
                        </View>
                    </>
                }
                errorContent={
                    <View style={styles.errorTextContainer}>
                        {
                            this.state.errorMessage ?
                                <Text numberOfLines={2} style={styles.errorText}>{this.state.errorMessage}</Text>
                                : null
                        }
                    </View>
                }
                topButtonComponent={
                    <Button
                        text={I18n.t(TextNames.resendVerificationEmail)}
                        textColor={Theme.c(Colors.textOnLightBackground_dm)}
                        onPress={this.onPress_ResendVerificatioNEmail}
                        backgroundColor={Theme.c(Colors.lightBackground_dm)}
                    />
                }
                transparentButtonComponent={
                    <Button
                        text={I18n.t(TextNames.signout)}
                        textColor={Theme.c(Colors.midLightGrey_dm)}
                        onPress={this.onPress_Signout}
                        backgroundColor={"transparent"}
                    />
                }
            />
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth,
    locale: state.locale
})

const mapDispatchToProps = dispatch => ({
    signout: () => dispatch(AuthActions.signOutRequest()),
    resendVerificationEmailRequest: () => dispatch(AuthActions.resendVerificationEmailRequest()),
    setLoadingMode: isLoading => dispatch(LoadingActions.setLoadingMode(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedUserScreen);