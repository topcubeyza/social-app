// Packages
import React, { Component } from "react"
import Modal from "react-native-modal"
import PropTypes from "prop-types"

// RN Components
import {
    View,
    Text,
    SafeAreaView
} from "react-native"

// Components
import SlidingUpModal from "../../../Components/SlidingUpModal"
import SingleLineInputBackground from "../../../Components/SingleLineInputBackground"
import Button from "../../../Components/Button"

// Actions

// Utils

// Styles
import getStyles from "../Styles/PasswordConfirmationModalStyles"
import { Fonts, Metrics, SVG } from "../../../StylingConstants"
import { Colors, Images, themed } from '../../../Theming'

/**
 * @augments {Component<Props,State>}
 */
class PasswordConfirmationModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: ""
        }
    }

    // *** LIFECYCLE METHODS *** //

    // *** CALLBACKS *** //

    // *** REF METHODS *** //

    // *** CONVENIENCE METHODS *** //

    // *** EVENT HANDLERS *** //

    onChangeText_Password = (text) => {
        this.setState({
            password: text
        })
    }

    onPress_Confirm = () => {

    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <SlidingUpModal
                isVisible={true}
                onModalHide={this.props.onModalHide}
            >
                <View style={styles.topContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <SVG.EditPassword style={styles.icon} width={"100%"} height={"100%"} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Please enter your password before proceeding with bla bla</Text>
                        </View>
                    </View>
                    <View style={styles.textinputContainer}>
                        <SingleLineInputBackground
                            backgroundColor={themed.color(Colors.lightGrey_dm)}
                            onChangeText={this.onChangeText_Password}
                            placeholder="Password"
                            value={this.state.password}
                            margin={Metrics.marginHorizontal} />
                    </View>
                    <View style={styles.errorTextContainer}>
                        <Text style={styles.errorText}>Error</Text>
                    </View>
                </View>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor={themed.color(Colors.brandColor)}
                            text="Confirm"
                            textColor={themed.color(Colors.textOnBrandColor)}
                            onPress={this.onPress_Confirm} />
                    </View>
                </SafeAreaView>

            </SlidingUpModal>
        );
    }

}

PasswordConfirmationModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onPasswordConfirmed: PropTypes.func.isRequired,
    onModalHide: PropTypes.func,
}

PasswordConfirmationModal.defaultProps = {
    onModalHide: () => { }
}

export default PasswordConfirmationModal;