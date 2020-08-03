// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { Appearance } from "react-native-appearance"
import validate from "validate.js";

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
import { ThemeActions } from "../../../Theming/Redux/ThemeRedux"
import { LocalizationActions } from "../../../Localization/Redux/LocalizationRedux";

// Services
import FirebaseApi from "../../../Services/Firebase"

// Utils
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";
import { showAlert, closeAlert } from "../../../Helpers/AlertHelpers"
import { Texts, localized } from "../../../Localization";

// Styles
import getStyles from "../Styles/UnverifiedUserStyles"
import { Colors, themed, ThemeModes, getColorMode } from '../../../Theming'

class UnverifiedUserScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        }
    }

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, "user", data => data == null);
        switch (cause) {
            case UpdateCauses.fetching:
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                this.showErrorMessage(this.props.auth.error)
                this.props.setLoadingMode(false)
                break;
            case UpdateCauses.success:
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

    onPress_ResendVerificatioNEmail = async () => {
        try {
            this.props.setLoadingMode(true)
            await FirebaseApi.sendVerificationEmail();
            showAlert({
                title: localized.text(Texts.success),
                message: localized.text(Texts.resendSuccessfulMessage),
                buttons: [{
                    text: localized.text(Texts.ok),
                    onPress: () => closeAlert()
                }],
                cancellable: true
            })
        } catch (error) {
            let errorMessage = localized.text(Texts.genericError);
            if (validate.isString(error)) {
                errorMessage = error;
            }

            this.showErrorMessage(errorMessage)
        } finally {
            this.props.setLoadingMode(false)
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let user = this.props.auth.candidateUser
        if (user == null || validate.isEmpty(user.displayName)) return null;

        let styles = getStyles(themed.color)
        return (
            <ScreenWrapper
                topContainerContent={
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={styles.helloText}>{localized.text(Texts.helloName, { name: user.displayName })}</Text>
                            <Text style={styles.message}>{localized.text(Texts.accountCreated)}</Text>
                            <Text style={styles.message}>{localized.text(Texts.verifyEmail, { email: user.email })}</Text>
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
                        text={localized.text(Texts.resendVerificationEmail)}
                        textColor={themed.color(Colors.textOnLightBackground_dm)}
                        onPress={this.onPress_ResendVerificatioNEmail}
                        backgroundColor={themed.color(Colors.lightBackground_dm)}
                    />
                }
                transparentButtonComponent={
                    <Button
                        text={localized.text(Texts.signout)}
                        textColor={themed.color(Colors.midLightGrey_dm)}
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
    locale: state.locale,
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    signout: () => dispatch(AuthActions.signOutRequest()),
    setLoadingMode: isLoading => dispatch(LoadingActions.setLoadingMode(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedUserScreen);