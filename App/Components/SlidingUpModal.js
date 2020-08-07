// Packages
import React, { Component } from "react"
import Modal from "react-native-modal"
import PropTypes from "prop-types"
import LottieView from "lottie-react-native"

// RN Components
import {
    View,
    Text,
    SafeAreaView,
} from "react-native"

// Components

// Actions

// Utils

// Styles
import getStyles from "./Styles/SlidingUpModalStyles"
import { Fonts, Metrics } from "../StylingConstants"
import { Colors, Images, themed } from '../Theming'

class SlidingUpModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        }
    }

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        if (this.props.isVisible != prevProps.isVisible) {
            this.setState({
                isVisible: this.props.isVisible
            })
        }
    }

    // *** CALLBACKS *** //

    // *** REF METHODS *** //

    // *** CONVENIENCE METHODS *** //

    hideModal = () => {
        this.setState({
            isVisible: false
        })
    }

    // *** EVENT HANDLERS *** //

    onSwipeComplete = ({ swipingDirection }) => {
        console.log(swipingDirection)
        if (swipingDirection == "up") {
            this.hideModal()
        }
    }

    // *** RENDER METHODS *** //

    render() {
        let styles = getStyles(themed.color)
        return (
            <Modal
                isVisible={this.state.isVisible}
                avoidKeyboard={true}
                backdropColor={themed.color(Colors.overlayColor)}
                backdropOpacity={1}
                onBackdropPress={this.hideModal}
                onModalHide={this.props.onModalHide}
                style={styles.modal}
                swipeDirection="down"
                onSwipeComplete={this.hideModal}>
                <View style={styles.container}>
                    {this.props.children}

                    {
                        this.props.loading ?
                            <SafeAreaView style={styles.loadingOverlay}>
                                <LottieView
                                    speed={2}
                                    source={themed.image(Images.loadingAnimation)}
                                    style={styles.lottie}
                                    autoPlay
                                    loop />
                            </SafeAreaView>
                            : null
                    }
                </View>
            </Modal>
        );
    }

}

SlidingUpModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onModalHide: PropTypes.func
}

SlidingUpModal.defaultProps = {
    onModalHide: () => { }
}

export default SlidingUpModal;