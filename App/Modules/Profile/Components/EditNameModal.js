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
 * @augments {Component<Props,State>}
 */
class EditNameModal extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            displayName: "",
            errorMessage: "",
            loading: false
        }

        this.state = {...this.initialState}

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

            // When keyboard hides, underline of the textinputs must be removed
            if (this.nameInput != null) {
                this.nameInput.removeUnderline()
            }
        }
    }

    // *** REF METHODS *** //

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

    changeName = () => {
        FirebaseApi.updateUserProfile({displayName: this.state.displayName})
            .then(() => {
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
                this.setState({
                    loading: false
                }, () => {
                    this.showErrorMessage(error);
                })
            })
    }

    // *** EVENT HANDLERS *** //

    onModalHide = () => {
        this.props.onModalHide();
        this.setState({...this.initialState})
    }

    onChangeText_DisplayName = (text) => {
        this.setState({
            displayName: text
        })
    }

    onPress_Confirm = () => {
        let { ok, message } = checkFields({ displayName: this.state.displayName });
        if (!ok) {
            this.showErrorMessage(message)
        }
        else {
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
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            ref={ref => this.nameInput = ref}
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_DisplayName}
                            placeholder={localized.text(Texts.newName)}
                            value={this.state.displayName}
                            margin={Metrics.marginHorizontal} />
                    </View>
                    <View style={styles.errorTextContainer}>
                        {
                            this.state.errorMessage === "" ?
                                null
                                :
                                <Text numberOfLines={2} style={styles.errorText}>
                                    {this.state.errorMessage}
                                </Text>
                        }
                    </View>
                </View>
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
    isVisible: PropTypes.bool.isRequired,
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
    setUser: (user) => dispatch(AuthActions.setUser({user}))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNameModal);