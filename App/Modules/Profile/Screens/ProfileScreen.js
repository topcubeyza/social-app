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
import PasswordConfirmationModal from "../Components/PasswordConfirmationModal"
import ChangePasswordModal from "../Components/ChangePasswordModal"
import EditNameModal from "../Components/EditNameModal"

// Actions
import { AuthActions } from "../../Authorization/Redux/AuthRedux"

// Utils
import { Texts, localized } from "../../../Localization";
import { showAlert, closeAlert } from "../../../Helpers/AlertHelpers";

// Styles
import getStyles from "../Styles/ProfileStyles"
import { Colors, themed } from '../../../Theming'
import { SVG } from "../../../StylingConstants";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible_PasswordConfirmationModal: false,
            isVisible_ChangePasswordModal: false,
            isVisible_EditNameModal: false,
            passwordConfirmationReason: ""
        }
    }

    // *** LIFECYCLE METHODS *** //

    // *** CONVENIENCE METHODS *** //

    showPasswordConfirmationModal = (reason) => {
        this.setState({
            isVisible_PasswordConfirmationModal: true,
            passwordConfirmationReason: reason
        })
    }

    showChangePasswordModal = () => {
        this.setState({
            isVisible_ChangePasswordModal: true
        })
    }

    showEditNameModal = () => {
        this.setState({
            isVisible_EditNameModal: true
        })
    }

    // *** EVENT HANDLERS *** //

    onPress_EditName = () => {
        this.showEditNameModal();
    }

    onPress_ChangePassword = () => {
        this.showPasswordConfirmationModal("password-change")
    }

    onPress_Signout = () => {
        this.props.signoutRequest();
    }

    onPress_DeleteAccount = () => {
        showAlert({
            title: localized.text(Texts.sure),
            message: localized.text(Texts.sureToDeleteAccount),
            buttons: [
                {
                    text: localized.text(Texts.yes),
                    onPress: () => {
                        closeAlert()
                        this.showPasswordConfirmationModal({reason: "account-deletion"})
                    }
                },
                {
                    text: localized.text(Texts.cancel),
                    onPress: () => closeAlert()
                }
            ]
        })
    }

    onPasswordConfirmed = () => {
        this.setState({
            isVisible_PasswordConfirmationModal: false
        }, () => {
            if (this.state.passwordConfirmationReason == "account-deletion") {
                // delete account
            }
            else if (this.state.passwordConfirmationReason == "password-change") {
                this.setState({
                    isVisible_ChangePasswordModal: true
                })
            }
        })
    }

    // *** RENDER METHODS *** //

    render() {
        if (validate.isEmpty(this.props.user)) return null;
        let styles = getStyles(themed.color)
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.displayNameText}>{this.props.user.displayName}</Text>
                    <Text style={styles.emailText}>{this.props.user.email}</Text>
                </View>
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

                <PasswordConfirmationModal 
                    isVisible={this.state.isVisible_PasswordConfirmationModal}
                    onModalHide={() => this.setState({isVisible_PasswordConfirmationModal: false})} 
                    onPasswordConfirmed={this.onPasswordConfirmed}/>

                <ChangePasswordModal 
                    isVisible={this.state.isVisible_ChangePasswordModal}
                    onModalHide={() => this.setState({isVisible_ChangePasswordModal: false})}
                    onPasswordChanged={() => this.setState({isVisible_ChangePasswordModal: false})}/>

                <EditNameModal 
                    isVisible={this.state.isVisible_EditNameModal}
                    onModalHide={() => this.setState({isVisible_EditNameModal: false})}
                    onNameEdited={() => this.setState({isVisible_EditNameModal: false})}/>
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