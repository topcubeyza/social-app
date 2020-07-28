// Packages
import React, { Component } from "react"
import PropTypes from "prop-types"
import validate from "validate.js";

// RN Components
import {
    View,
    TouchableOpacity,
    Text,
    Modal
} from "react-native"

// Styles
import getStyles from "./Styles/AlertOverlayStyles"
import { Colors, Images, Theme } from '../Themes'

class AlertOverlay extends Component {

    static propTypes = {
        cancellable: PropTypes.bool,
        onBackdropPress: PropTypes.func,
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        buttons: PropTypes.array.isRequired,
    }

    static defaultProps = {
        cancellable: true,
        onBackdropPress: () => { },
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        buttons: [{ text: "OK" }],
    }

    // *** EVENT HANDLERS *** //

    onBackdropPress = () => {
        debugger;
        if (this.props.cancellable) {
            validate.isFunction(this.props.onBackdropPress) ? this.props.onBackdropPress() : null
            this.props.close()
        }
    }

    // *** RENDER METHODS *** //

    renderButtons = () => {
        let styles = getStyles(Theme.c)
        if (validate.isArray(this.props.buttons)) {
            return this.props.buttons.map((value, index) => {
                if (index < 2) {
                    return (
                        <TouchableOpacity
                            key={"button-" + index}
                            style={styles.button}
                            onPress={validate.isFunction(value.onPress) ? value.onPress : () => { }}>
                            <Text
                                style={index == 0 ? styles.buttonTextPositive : styles.buttonTextNegative}>
                                {value.text}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                return null;
            })
        }

        return null;
    }

    render() {
        let styles = getStyles(Theme.c)
        console.log(styles)
        return (
            <Modal
                visible={this.props.isOpen}
                transparent={true}>
                <TouchableOpacity style={styles.modal} onPress={() => this.onBackdropPress()}>
                    <View style={styles.container} onStartShouldSetResponder={() => true}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.message} numberOfLines={100}>{this.props.message}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            {this.renderButtons()}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

}

export default AlertOverlay;