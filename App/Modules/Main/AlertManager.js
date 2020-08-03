import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AlertActions } from "../../Redux/AlertRedux"

import getStyles from "./Styles/AlertStyles"


const initialState = {
    isOpen: false,
    title: '',
    message: '',
    buttons: [],
    onBackdropPress: () => { },
    cancellable: true
};

class AlertManager extends Component {

    // *** EVENT HANDLERS *** //

    onPress_Backdrop = () => {
        let lastAlert = this.props.alerts[this.props.alerts.length - 1]
        if (lastAlert.cancellable) {
            validate.isFunction(lastAlert.onBackdropPress) ? lastAlert.onBackdropPress() : null
            this.props.removeLastAlert()
        }
    }

    // *** RENDER METHODS *** //

    renderButtons = (buttons) => {
        let styles = getStyles(Theme.c)
        if (validate.isArray(buttons)) {
            return buttons.map((button, index) => {
                if (index < 2) {
                    return (
                        <TouchableOpacity
                            key={"button-" + index}
                            style={styles.button}
                            onPress={validate.isFunction(button.onPress) ? button.onPress : () => { }}>
                            <Text
                                style={index == 0 ? styles.buttonTextPositive : styles.buttonTextNegative}>
                                {button.text}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                return null;
            })
        }

        return null;
    }

    renderLastAlert() {
        let lastAlert = this.props.alerts[this.props.alerts.length - 1]
        return (
            <>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{lastAlert.title}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.message} numberOfLines={100}>{lastAlert.message}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderButtons(lastAlert.buttons)}
                </View>
            </>
        )
    }

    render() {
        let styles = getStyles(Theme.c)
        return (
            <Modal
                visible={this.props.alerts.length > 0}
                transparent={true}>
                <TouchableOpacity style={styles.modal} onPress={() => this.onPress_Backdrop()}>
                    <View style={styles.container} onStartShouldSetResponder={() => true}>
                        {this.renderLastAlert()}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    alerts: state.alert.alerts
})

const mapDispatchToProps = dispatch => ({
    removeLastAlert: () => dispatch(AlertActions.removeAlert())
})

export default connect(mapStateToProps)(AlertManager);