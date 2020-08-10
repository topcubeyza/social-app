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
import ErrorMessage from "../../../Components/ErrorMessage"

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

/**
 * A screen that informs the unverified user on email verification
 */
class UnverifiedUserScreen extends Component {

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, "user", data => data == null);

        switch (cause) {
            case UpdateCauses.fetching:
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                this.errorRef && this.errorRef.showErrorMessage(this.props.auth.error);
                this.props.setLoadingMode(false)
                break;
            case UpdateCauses.success:
                this.props.setLoadingMode(false)
                break;
            default:
                break;
        }
    }

    // *** EVENT HANDLERS *** //

    onPress_Signout = () => {
        // Request to signout the user using Redux action
        this.props.signout()
    }

    onPress_ResendVerificatioNEmail = async () => {
        try {
            // Show the loading overlay using the Redux action
            this.props.setLoadingMode(true)

            // Call the Firebase API's method
            await FirebaseApi.sendVerificationEmail();

            // Inform the user that mail is sent
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
            // Show the error message
            this.errorRef && this.errorRef.showErrorMessage(error);
        } finally {
            // Hide the loading overlay using Redux action
            this.props.setLoadingMode(false)
        }
    }

    // *** RENDER METHODS *** //

    render() {
        // The user of this screen is the candidate user with unverifified email address
        let user = this.props.auth.candidateUser
        // Render only when the user is not null and the user's displayName is set
        if (user == null || validate.isEmpty(user.displayName)) return null;

        let styles = getStyles(themed.color)
        return (
            <ScreenWrapper
                topContainerContent={
                    // Informative Message about Email Verification
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={styles.helloText}>{localized.text(Texts.helloName, { name: user.displayName })}</Text>
                            <Text style={styles.message}>{localized.text(Texts.accountCreated)}</Text>
                            <Text style={styles.message}>{localized.text(Texts.verifyEmail, { email: user.email })}</Text>
                        </View>
                    </>
                }
                errorContent={
                    // Error Message
                    <View style={styles.errorTextContainer}>
                        <ErrorMessage key="auth-screens-wrapper-error" ref={ref => this.errorRef = ref} />
                    </View>
                }
                topButtonComponent={
                    // Button to ask to resend the verification email
                    <Button
                        text={localized.text(Texts.resendVerificationEmail)}
                        textColor={themed.color(Colors.textOnLightBackground_dm)}
                        onPress={this.onPress_ResendVerificatioNEmail}
                        backgroundColor={themed.color(Colors.lightBackground_dm)}
                    />
                }
                transparentButtonComponent={
                    // Button to signout
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