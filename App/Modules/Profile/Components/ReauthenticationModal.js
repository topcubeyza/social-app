// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "react-native-modal"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    Keyboard
} from "react-native"

// Components
import SlidingUpModal from "../../../Components/SlidingUpModal"
import SingleLineInputBackground from "../../../Components/SingleLineInputBackground"
import Button from "../../../Components/Button"
import ErrorMessage from "../../../Components/ErrorMessage"
import ConfirmPasswordModalContent from "./ConfirmPasswordModalContent"
import AuthProvidersModalContent from "./AuthProvidersModalContent"

// Actions

// Utils
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 *  A modal that renders a ui for the user to reauthenticate herself
 * @augments {Component<Props>}
 */
class ReauthenticationModal extends Component {

    constructor(props) {
        super(props);

        // The initial state must be saved to return to it when modal hides
        this.initialState = {
            isShowingConfirmPasswordContent: false,
            loading: false
        }

        this.state = {
            ...this.initialState,
            hasGoogleProvider: false,
            hasEmailProvider: false,
        }
    }

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        let providerIds = FirebaseApi.getProviderIds();
        let { hasGoogleProvider, hasEmailProvider } = this.state;
        providerIds.map(providerId => {
            if (providerId == FirebaseApi.googleProviderId) {
                hasGoogleProvider = true;
            }
            else if (providerId == FirebaseApi.emailProviderId) {
                hasEmailProvider = true;
            }
        })

        this.setState({ hasGoogleProvider, hasEmailProvider })
    }

    // *** CONVENIENCE METHODS *** //

    reauthenticateUserWith = (apiMethod, params, showErrorMessageMethod) => {
        this.setState({
            loading: true
        }, () => {
            apiMethod(params)
                .then(result => {
                    // Set the loading mode off and call the parent's callback
                    this.setState({
                        loading: false
                    }, () => {
                        this.props.onUserReauthenticated();
                    })
                })
                .catch((error) => {
                    // Set the loading mode off and show the error message
                    this.setState({
                        loading: false
                    }, () => {
                        showErrorMessageMethod(error)
                    })
                })
        })
    }

    // Calls the API to reauthenticate user with password
    reauthenticateUserWithPassword = (password) => {
        let email = this.props.user.email;
        this.reauthenticateUserWith(
            FirebaseApi.reauthenticateWithEmailPassword,
            { email, password },
            error => {
                this.confirmPassRef && this.confirmPassRef.showErrorMessage(error);
            })
    }

    // Calls the API to reauthenticate user with Google
    reauthenticateUserWithGoogle = () => {

        this.reauthenticateUserWith(FirebaseApi.reauthenticateWithGoogle, null, () => {})
    }

    // *** EVENT HANDLERS *** //

    onModalHide = () => {
        this.props.onModalHide();

        // Return to initial state, so that when the modal is shown again, it will be brand new
        this.setState({ ...this.initialState })
    }

    onPress_ReauthenticateWithGoogle = () => {
        this.reauthenticateUserWithGoogle();
    }

    onPress_ReauthenticateWithPassword = () => {
        this.setState({
            isShowingConfirmPasswordContent: true
        })
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <SlidingUpModal
                keyAsProp="reauthentication"
                isVisible={this.props.isVisible}
                onModalHide={this.onModalHide}
                loading={this.state.loading}
            >
                {
                    this.state.isShowingConfirmPasswordContent ?
                        <ConfirmPasswordModalContent
                            ref={ref => this.confirmPassRef = ref}
                            reauthenticateUser={password => this.reauthenticateUserWithPassword(password)} />
                        :
                        <AuthProvidersModalContent
                            hasEmailProvider={this.state.hasEmailProvider}
                            hasGoogleProvider={this.state.hasGoogleProvider}
                            onPress_ReauthenticateWithGoogle={this.onPress_ReauthenticateWithGoogle}
                            onPress_ReauthenticateWithPassword={this.onPress_ReauthenticateWithPassword} />
                }
            </SlidingUpModal>
        );
    }

}

ReauthenticationModal.propTypes = {
    /** The visibility of the modal */
    isVisible: PropTypes.bool.isRequired,
    /** The callback function to call when the user is successfully reauthenticated */
    onUserReauthenticated: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

ReauthenticationModal.defaultProps = {
    onModalHide: () => { }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(ReauthenticationModal);