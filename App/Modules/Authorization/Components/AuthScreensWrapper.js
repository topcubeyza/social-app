// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import I18n from "react-native-i18n";
import { getStatusBarHeight } from "react-native-status-bar-height"

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

// Actions
import { LoadingActions } from "../../../Redux/LoadingRedux";

// Utils
import checkCredentials from "../Utils/CredentialsCheck"
import { getUpdateCause, UpdateCauses } from "../../../Helpers/ReduxHelpers";

// Styles
import getStyles from "../Styles/CommonStyles"
import { Fonts, Metrics } from "../../../StylingConstants"
import { Colors, themed } from '../../../Theming'
import { TextNames } from "../../../I18n/languages/Names";
import validate from "validate.js";

class AuthScreensWrapper extends Component {

    constructor(props) {
        super(props);

        let inputsState = {}
        this.props.textInputsParams.map(value => inputsState[value.inputKey] = null)

        this.state = {
            ...inputsState,
            headerFontSize: new Animated.Value(Fonts.size.twenty * 2),
            errorMessage: "",
        }

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
                this.props.setLoadingMode(true)
                break;
            case UpdateCauses.fail:
                this.showErrorMessage(this.props.auth.error)
                this.turnOffLoadingMode()
                break;
            case UpdateCauses.success:
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
            Object.entries(this.textinputs).map(entry => {
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
                // checking if the textinput is mounted
                if (textinput[1] != null && !textinput[1].isFocused()) {
                    textinput[1].removeUnderline()
                }
            })

            this.increaseHeaderFontSize()
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

    increaseHeaderFontSize = () => {
        Animated.timing(
            this.state.headerFontSize,
            {
                toValue: Fonts.size.twenty * 2,
                duration: 300
            }
        ).start()
    }

    decreaseHeaderFontSize = () => {
        Animated.timing(
            this.state.headerFontSize,
            {
                toValue: Fonts.size.twenty * 1.5,
                duration: 300
            }
        ).start()
    }

    turnOffLoadingMode = () => {
        this.props.setLoadingMode(false)
        this.decreaseHeaderFontSize()
    }

    // *** EVENT HANDLERS *** //

    onChangeText = (text, key) => {
        let newState = {}
        newState[key] = text;
        this.setState(newState)
    }

    onPress_TopButton = () => {
        let { ok, message } = checkCredentials(this.state)
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
            this.props.request(this.state)
        }
    }

    // key: key of the textinput
    onFocus_TextInput = (key) => {
        // Remove underline of the previously focused textinput
        Object.entries(this.textinputs).map(entry => {
            if (entry[0] != key && entry[1] != null) {
                entry[1].removeUnderline()
            }
        })

        // If keyboard was not previously visible and it will be shown just in a moment,
        // Shrink the header with animation
        if (!this.keyboardVisible) {
            this.decreaseHeaderFontSize()
        }

    }

    onPress_Background = () => {
        // If keyboard was previously visible and it will be hidden just in a moment,
        // Enlarge the header with animation
        if (!this.keyboardVisible) return;
        Keyboard.dismiss();
    }

    // *** RENDER METHODS *** //

    renderTextInputs = () => {
        return this.props.textInputsParams.map((value, index) => {
            return (
                <AuthInputsComponent
                    {...value}
                    autoFocus={index==0}
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
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Metrics.headerHeight + getStatusBarHeight(true)} behavior={Platform.OS == "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={this.onPress_Background}>
                    <View style={styles.container}>
                            <ScreenWrapper
                                topContainerContent={
                                        <View style={styles.textinputsContainer} onStartShouldSetResponder={() => true}>
                                            {this.renderTextInputs()}
                                        </View>
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
                                        text={this.props.topButtonText}
                                        textColor={themed.color(Colors.textOnBrandColor)}
                                        onPress={this.onPress_TopButton}
                                        backgroundColor={themed.color(Colors.brandColor)}
                                    />
                                }
                                transparentButtonComponent={
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

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
    setLoadingMode: isLoading => dispatch(LoadingActions.setLoadingMode(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreensWrapper);