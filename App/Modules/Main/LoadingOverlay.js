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
import { Colors, Images, Theme } from '../../Themes'

class LoadingOverlay extends Component {

    renderLoadingAnimation = () => {
        let styles = getStyles(Theme.c)

        return (
            <LottieView 
            speed={2}
            source={Theme.i(Images.loadingAnimation)} 
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
                overlayColor={Theme.c(Colors.overlayColor)}
                customIndicator={this.renderLoadingAnimation()}
            />
        )
    }

}

const mapStateToProps = state => ({
    isLoading: state.loading.isLoading
})

export default connect(mapStateToProps)(LoadingOverlay);