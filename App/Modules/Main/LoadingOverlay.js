// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from "lottie-react-native";

// RN Components
import {
    View,
} from "react-native"

// Styles
import getStyles from "./Styles/LoadingOverlayStyles"
import { Colors, Images, themed } from '../../Theming'

class LoadingOverlay extends Component {

    renderLoadingAnimation = () => {
        let styles = getStyles(themed.color)

        return (
            <LottieView 
            speed={2}
            source={themed.image(Images.loadingAnimation)} 
            style={styles.lottie}
            autoPlay 
            loop/>
        )
    }

    render() {
        return (
            <Spinner
                visible={this.props.isLoading}
                cancelable={true}
                animation="fade"
                overlayColor={themed.color(Colors.overlayColor)}
                customIndicator={this.renderLoadingAnimation()}
            />
        )
    }

}

const mapStateToProps = state => ({
    isLoading: state.loading.isLoading
})

export default connect(mapStateToProps)(LoadingOverlay);