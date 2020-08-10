// Packages
import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "react-native-modal"
import PropTypes from "prop-types"
import _ from "lodash"

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

// Actions
import { AuthActions } from "../../Authorization/Redux/AuthRedux"

// Utils
import checkFields from "../Utils/FieldsCheck"
import { localized, Texts } from "../../../Localization"
import FirebaseApi from "../../../Services/Firebase"

// Styles
import getStyles from "../Styles/ChangePasswordModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 *  A modal that renders a ui for the user to change her display name
 * @augments {Component<Props>}
 */
class EditNameModal extends Component {

    constructor(props) {
        super(props);

        // The initial state must be saved to return to it when modal hides
        this.initialState = {
            displayName: "",
            loading: false
        }

        this.state = { ...this.initialState }

        // Holds the reference to name input
        this.nameInput = null;

        this.keyboardVisible = false;
    }

    // *** LIFECYCLE METHODS *** //

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow)
        if (Platform.OS == "ios") {
            this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this.onKeyboardDidHide)
        }
        else {
            this.keyboardDidHideListeneer = Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide)
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        if (Platform.OS == "ios") {
            this.keyboardWillHideListener.remove();
        }
        else {
            this.keyboardDidHideListeneer.remove();
        }
    }

    // *** CALLBACKS *** //

    onKeyboardDidShow = () => {
        if (!this.keyboardVisible) {
            this.keyboardVisible = true;
        }
    }

    onKeyboardDidHide = () => {
        if (this.keyboardVisible) {
            this.keyboardVisible = false;

            // When keyboard hides, underline of the name input must be removed
            if (this.nameInput != null) {
                this.nameInput.removeUnderline()
            }
        }
    }

    // *** CONVENIENCE METHODS *** //

    changeName = () => {
        FirebaseApi.updateUserProfile({ displayName: this.state.displayName })
            .then(() => {
                // Set the loading mode off, set the user with Auth Action, and call the parent's callback
                this.setState({
                    loading: false
                }, () => {
                    let user = _.cloneDeep(this.props.user);
                    user.displayName = this.state.displayName;

                    this.props.setUser(user);
                    this.props.onNameEdited();
                })
            })
            .catch((error) => {
                // Set the loading mode off and show the error message
                this.setState({
                    loading: false
                }, () => {
                    this.errorRef && this.errorRef.showErrorMessage(error);
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onModalHide = () => {
        this.props.onModalHide();

        // Return to initial state, so that when the modal is shown again, it will be brand new
        this.setState({ ...this.initialState })
    }

    onChangeText_DisplayName = (text) => {

        // Simply updating state when the name text changes
        this.setState({
            displayName: text
        })
    }

    // The Confirm button's onPress method
    onPress_Confirm = () => {
        // Check the validity of displayName first.
        let { ok, message } = checkFields({ displayName: this.state.displayName });
        if (!ok) {
            // Show the error message if displayName is not valid
            this.errorRef && this.errorRef.showErrorMessage(message);
        }
        else {
            // Dismiss the keyboard, show the loading overlay and call the api
            Keyboard.dismiss();
            this.setState({
                loading: true
            }, () => {
                this.changeName();
            })
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                isVisible={this.props.isVisible}
                onModalHide={this.onModalHide}
                loading={this.state.loading}
            >
                <View style={styles.topContainer}>
                    {/* Display Name Input */}
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.nameInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_DisplayName}
                            placeholder={localized.text(Texts.newName)}
                            value={this.state.displayName}
                            margin={Metrics.marginHorizontal} />
                    </View>
                    {/* Error message */}
                    <View style={styles.errorTextContainer}>
                        <ErrorMessage key="auth-screens-wrapper-error" ref={ref => this.errorRef = ref} />
                    </View>
                </View>
                {/* The part that renders the 'confirm' button in a container with a different background color
                Use SafeAreaView to put the button inside the safe area */}
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text={localized.text(Texts.confirm)}
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Confirm} />
                    </View>
                </SafeAreaView>
            </SlidingUpModal>
        );
    }

}

EditNameModal.propTypes = {
    /** The visibility of the modal */
    isVisible: PropTypes.bool.isRequired,
    /** The callback function to call when the display name is successfully changed */
    onNameEdited: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

EditNameModal.defaultProps = {
    onModalHide: () => { }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(AuthActions.setUser({ user }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNameModal);