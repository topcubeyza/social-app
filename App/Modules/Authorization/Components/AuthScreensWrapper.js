// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { duration } from "moment";
import { getStatusBarHeight } from "react-native-status-bar-height"
import validate from "validate.js";

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    StatusBarIOS
} from "react-native"

// Components
import ScreenWrapper from "../Components/ScreenWrapper"
import Button from "../../../Components/Button"
import AuthInputsComponent from "../Components/AuthInputsComponent"
import ErrorMessage from "../../../Components/ErrorMessage"

// Actions
import { LoadingActions } from "../../../Redux/LoadingRedux";

// Utils
import checkCredentials from "../Utils/CredentialsCheck"
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";

// Styles
import getStyles from "../Styles/CommonStyles"
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors, themed } from '../../../Theming'
import { Texts, localized } from "../../../Localization"

/**
 * This is a wrapper class for Auth Screens that have a similar structure.
 * i.e. a number of text inputs, a button below etc.
 * @augments {Component<Props>}
 */
class AuthScreensWrapper extends Component {

    constructor(props) {
        super(props);

        // forming an object with 'key: key of the textinputs' & 'value: value of the textinputs'
        // i.e. { password: "abc" }
        let inputsState = {}
        this.props.textInputsParams.map(textInputParams => inputsState[textInputParams.inputKey] = null)

        // put the textinput key:value pairs in the component state
        this.state = {
            ...inputsState,
        }

        // this variable will hold the references of the text inputs
        // key: textinput component key - value: textinput reference
        this.textinputs = {}
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

    componentDidUpdate(prevProps) {
        let cause = getUpdateCause(prevProps.auth, this.props.auth, this.props.dataFieldName, this.props.isDataValid);
        switch (cause) {
            case UpdateCauses.fetching:
                // Show a loading overlay when fetching starts
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                // Show the error message and hide the loading overlay
                this.errorRef && this.errorRef.showErrorMessage(this.props.auth.error);
                this.turnOffLoadingMode()
                break;
            case UpdateCauses.success:
                // Call the parent classes onSuccess method and hide the loading overlay
                this.props.onRequestSuccess();
                this.turnOffLoadingMode()
                break;
            default:
                break;
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

            // When keyboard is shown, underline of the active textinput must be drawn
            Object.entries(this.textinputs).map(entry => {
                // checking if the textinput is mounted and is focused
                if (entry[1] != null && entry[1].isFocused()) {
                    entry[1].drawUnderline();
                }
            })
        }
    }

    onKeyboardDidHide = () => {
        if (this.keyboardVisible) {
            this.keyboardVisible = false;

            // When keyboard hides, underline of the active textinput must be removed
            Object.entries(this.textinputs).map(textinput => {
                // checking if the textinput is mounted and is focused
                if (textinput[1] != null && !textinput[1].isFocused()) {
                    textinput[1].removeUnderline()
                }
            })
        }
    }

    // *** CONVENIENCE METHODS *** //

    // Closes the loading overlay with a redux action
    turnOffLoadingMode = () => {
        this.props.setLoadingMode(false)
    }

    // *** EVENT HANDLERS *** //

    // Called when text changes in any of the text inputs
    // 'key' is the key of the text input
    onChangeText = (text, key) => {

        // update the value of the text input on the state
        // i.e. this.setState({ password: "abc" })
        let newState = {}
        newState[key] = text;
        this.setState(newState)
    }

    onPress_TopButton = () => {
        // Check the values of the inputs.
        let { ok, message } = checkCredentials(this.state)

        // If values are invalid, show error message. Otherwise, send the request.
        if (!ok) {
            this.errorRef && this.errorRef.showErrorMessage(message);
        }
        else {
            this.props.request(this.state)
        }
    }

    /**
     * When a text input is focused, this method is called with the key of the text input
     * It removes the underline of the other text inputs.
     * @param {any} key - the key of text input
     */
    onFocus_TextInput = (key) => {
        // Iterate through the refs of the text inputs
        Object.entries(this.textinputs).map(entry => {
            // if the 'entry' is not the entry that has just been focused AND if it is not null: 
            // Remove its underline
            if (entry[0] != key && entry[1] != null) {
                entry[1].removeUnderline()
            }
        })

    }

    // When the background is touched, dismiss the keyboard if it is visible
    onPress_Background = () => {
        if (!this.keyboardVisible) return;
        Keyboard.dismiss();
    }

    // *** RENDER METHODS *** //

    // Renders the inputs based on the array provided by props 'textInputsParams'
    renderTextInputs = () => {
        return this.props.textInputsParams.map((value, index) => {
            return (
                <AuthInputsComponent
                    {...value}
                    autoFocus={index == 0}
                    key={value.inputKey}
                    reference={ref => this.textinputs[value.inputKey] = ref}
                    onFocus={this.onFocus_TextInput}
                    value={this.state[value.inputKey] ? this.state[value.inputKey] : ""}
                    onChangeText={this.onChangeText}
                />
            )
        })
    }

    render() {
        let styles = getStyles(themed.color)
        return (
            // The keyboard vertical offset in iOS is the sum of the navigation header's height and the iOS status bar height
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Metrics.headerHeight + getStatusBarHeight(true)} behavior={Platform.OS == "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={this.onPress_Background}>
                    <View style={styles.container}>
                        <ScreenWrapper
                            topContainerContent={
                                // TextInputs
                                <View style={styles.textinputsContainer} onStartShouldSetResponder={() => true}>
                                    {this.renderTextInputs()}
                                </View>
                            }
                            errorContent={
                                // Error message
                                <View style={styles.errorTextContainer}>
                                    <ErrorMessage key="auth-screens-wrapper-error" ref={ref => this.errorRef = ref}/>
                                </View>
                            }
                            topButtonComponent={
                                // The text and function of this button comes from props
                                <Button
                                    text={this.props.topButtonText}
                                    textColor={themed.color(Colors.textOnBrandColor)}
                                    onPress={this.onPress_TopButton}
                                    backgroundColor={themed.color(Colors.brandColor)}
                                />
                            }
                            transparentButtonComponent={
                                // The text and function of this button comes from props
                                <Button
                                    text={this.props.transparentButtonText}
                                    textColor={themed.color(Colors.midLightGrey_dm)}
                                    onPress={this.props.onPress_TransparentButton}
                                    backgroundColor={"transparent"}
                                />
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

}

AuthScreensWrapper.propTypes = {
    /** an array of objects */
    textInputsParams: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** see the method Helpers/ReduxHelpers/getUpdateCause */
    dataFieldName: PropTypes.string.isRequired,
    /** see the method Helpers/ReduxHelpers/getUpdateCause */
    isDataValid: PropTypes.func.isRequired,
    /** called when update cause is success, no params */
    onRequestSuccess: PropTypes.func.isRequired,
    /** the request function to call when top button is pressed */
    request: PropTypes.func.isRequired,
    topButtonText: PropTypes.string.isRequired,
    /** the text on the bottommost transparent background button. Default: "" */
    transparentButtonText: PropTypes.string,
    /** onPress event handler for the bottommost transparent background button. Default: () => {} */
    onPress_TransparentButton: PropTypes.func
}

AuthScreensWrapper.defaultProps = {
    transparentButtonText: "",
    onPress_TransparentButton: () => { }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
    setLoadingMode: isLoading => dispatch(LoadingActions.setLoadingMode(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreensWrapper);