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

/**
 * @augments {Component<Props>}
 * @classdesc The component is a bottom modal that slides from bottom to top.
 * Also shows a loading animation that covers the modal only, if given as props.
 */
class SlidingUpModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        }
    }

    // *** LIFECYCLE METHODS *** //

    componentDidUpdate(prevProps) {
        // Update state only if props.isVisible changed
        // props.isVisible is put to state.isVisible because visibility is also controlled within this component
        if (this.props.isVisible != prevProps.isVisible) {
            this.setState({
                isVisible: this.props.isVisible
            })
        }
    }

    // *** CONVENIENCE METHODS *** //

    hideModal = () => {
        this.setState({
            isVisible: false
        })
    }

    // *** EVENT HANDLERS *** //

    // Modal's onSwipeComplete handler.
    // Hides the modal.
    onSwipeComplete = ({ swipingDirection }) => {
        if (swipingDirection == "up") {
            this.hideModal()
        }
    }

    // Modal's onBackdropPress handler
    // Hides the modal.
    // Prevents hiding if modal is in loading state
    onBackdropPress = () => {
        if (!this.props.loading) {
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
                onBackdropPress={this.onBackdropPress}
                onModalHide={this.props.onModalHide}
                style={styles.modal}
                swipeDirection="down"
                onSwipeComplete={this.hideModal}>
                <View style={styles.container}>
                    
                    {/* Children */}
                    {this.props.children}

                    {/* Loading Overlay */}
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
    onModalHide: PropTypes.func,
    loading: PropTypes.bool,
}

SlidingUpModal.defaultProps = {
    onModalHide: () => { },
    loading: false,
}

export default SlidingUpModal;