// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import validate from "validate.js";

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import SettingsButton from "../Components/SettingsButton"
import ReauthenticationModal from "../Components/ReauthenticationModal"
import ChangePasswordModal from "../Components/ChangePasswordModal"
import EditNameModal from "../Components/EditNameModal"

// Actions
import { AuthActions } from "../../Authorization/Redux/AuthRedux"

// Utils
import { Texts, localized } from "../../../Localization";
import { showAlert, closeAlert } from "../../../Helpers/AlertHelpers";
import FirebaseApi from "../../../Services/Firebase";

// Styles
import getStyles from "../Styles/ProfileStyles"
import { Colors, themed } from '../../../Theming'
import { SVG } from "../../../StylingConstants";

/**
 * A screen that renders the user's profile and gives opportunity to edit things.
 */
class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible_ReauthenticationModal: false,
            isVisible_ChangePasswordModal: false,
            isVisible_EditNameModal: false,
            reauthenticationReason: "",
            userReauthenticationSuccess: false
        }
    }

    // *** CONVENIENCE METHODS *** //

    /**
     * Updates state to show ReauthenticationModal and sets the reason
     * @param {String} reason - why we need a reauthentication, 
     * for 'password-change' or for 'account-deletion' 
     */
    showReauthenticationModal = (reason) => {
        //
        this.setState({
            isVisible_ReauthenticationModal: true,
            reauthenticationReason: reason,
            userReauthenticationSuccess: false
        })
    }

    /**
     * Updates state to show ChangePasswordModal
     */
    showChangePasswordModal = () => {
        this.setState({
            isVisible_ChangePasswordModal: true
        })
    }

    /**
     * Updates state to show ChangePasswordModal
     */
    showEditNameModal = () => {
        this.setState({
            isVisible_EditNameModal: true
        })
    }

    // Calls the Firebase API to delete the current user's account
    deleteAccount = () => {
        FirebaseApi.deleteAccount()
            .catch(error => {
                // Show an alert in case an error occurs.
                showAlert({
                    title: localized.text(Texts.sorry),
                    message: error,
                    buttons: [
                        {
                            text: localized.text(Texts.ok),
                            onPress: () => {
                                closeAlert()
                            }
                        },
                    ]
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onPress_EditName = () => {
        this.showEditNameModal();
    }

    onPress_ChangePassword = () => {
        this.showReauthenticationModal("password-change")
    }

    onPress_Signout = () => {
        // Sign out the current user with Auth Action
        this.props.signoutRequest();
    }

    onPress_DeleteAccount = () => {
        // First show an alert to make sure the user knows what she's doing.
        showAlert({
            title: localized.text(Texts.sure),
            message: localized.text(Texts.sureToDeleteAccount),
            buttons: [
                {
                    text: localized.text(Texts.yes),
                    onPress: () => {
                        // If she is sure, then go ahead and ask for reauthentication
                        closeAlert()
                        this.showReauthenticationModal("account-deletion")
                    }
                },
                {
                    text: localized.text(Texts.cancel),
                    onPress: () => closeAlert()
                }
            ]
        })
    }

    onUserReauthenticated = () => {
        // Close the ReauthenticationModal
        this.setState({
            isVisible_ReauthenticationModal: false,
            userReauthenticationSuccess: true
        })
    }

    onModalHide_ReauthenticationModal = () => {
        // If this method was called after modal was hidden by the ReathenticationModal and not this screen
        if (this.state.isVisible_ReauthenticationModal) {
            this.setState({
                isVisible_ReauthenticationModal: false
            })
        }
        // If this screen hid the modal because reauthentication was successful (by onUserReauthenticated)
        else if (this.state.userReauthenticationSuccess) {
            // If the reason was deleting account, then delete the account
            if (this.state.reauthenticationReason == "account-deletion") {
                this.deleteAccount();
            }
            // If the reason was changing the password, show ChangePasswordModal
            else if (this.state.reauthenticationReason == "password-change") {
                this.setState({
                    isVisible_ChangePasswordModal: true
                })
            }
        }
    }

    onNameEdited = () => {
        // Close the EditNameModal when the name is successfuly updated
        this.setState({
            isVisible_EditNameModal: false
        })
    }

    onPasswordChanged = () => {
        // Close the ChangePasswordModal when the password is successfuly updated
        this.setState({
            isVisible_ChangePasswordModal: false
        }, () => {
            // Inform the user that the password is succesfuly updated
            showAlert({
                title: localized.text(Texts.success),
                message: localized.text(Texts.passwordChangeSuccessMessage),
                buttons: [
                    {
                        text: localized.text(Texts.ok),
                        onPress: () => {
                            closeAlert()
                        }
                    },
                ]
            })
        })
    }

    // *** RENDER METHODS *** //

    render() {
        if (validate.isEmpty(this.props.user)) return null;
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                {/* User's Information */}
                <View style={styles.infoContainer}>
                    <Text style={styles.displayNameText}>{this.props.user.displayName}</Text>
                    <Text style={styles.emailText}>{this.props.user.email}</Text>
                </View>
                {/* Settings - Editing name or password, etc. */}
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionHeader}>{localized.text(Texts.profileSettings)}</Text>
                    <SettingsButton
                        text={localized.text(Texts.editName)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.Edit}
                        onPress={this.onPress_EditName} />
                    <SettingsButton
                        text={localized.text(Texts.changePassword)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        icon={SVG.EditPassword}
                        onPress={this.onPress_ChangePassword} />
                </View>
                {/* Serious Actions - Signing out, Deleting account, etc. */}
                <View style={styles.seriousActionsContainer}>
                    <SettingsButton
                        text={localized.text(Texts.signout)}
                        color={themed.color(Colors.textOnLightBackground_dm)}
                        boldText
                        icon={SVG.Logout}
                        onPress={this.onPress_Signout} />
                    <SettingsButton
                        text={localized.text(Texts.deleteAccount)}
                        color={themed.color(Colors.brandColor)}
                        boldText
                        icon={SVG.Trash}
                        onPress={this.onPress_DeleteAccount} />
                </View>

                {/* The Modals */}

                <ReauthenticationModal
                    isVisible={this.state.isVisible_ReauthenticationModal}
                    onModalHide={this.onModalHide_ReauthenticationModal}
                    onUserReauthenticated={this.onUserReauthenticated} />

                <ChangePasswordModal
                    isVisible={this.state.isVisible_ChangePasswordModal}
                    onModalHide={() => this.setState({ isVisible_ChangePasswordModal: false })}
                    onPasswordChanged={this.onPasswordChanged} />

                <EditNameModal
                    isVisible={this.state.isVisible_EditNameModal}
                    onModalHide={() => this.setState({ isVisible_EditNameModal: false })}
                    onNameEdited={this.onNameEdited} />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    signoutRequest: () => dispatch(AuthActions.signOutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);