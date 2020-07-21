import React, { Component } from "react";
import { Animated, View, Image } from "react-native";
import { Images } from "../Themes"
import styles from "./Styles/SplashScreenAnimationStyles"

class SplashScreenAnimation extends Component {

    render() {
        return (
            <Animated.View style={styles.container}>
                <Animated.Image style={styles.image} source={Images.splashTransparent} />
            </Animated.View>
        )
    }

}

export default SplashScreenAnimation;