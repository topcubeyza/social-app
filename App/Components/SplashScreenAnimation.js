import React, { Component } from "react";
import { Animated, View, Image } from "react-native";
import { Images, Theme } from "../Themes"
import styles from "./Styles/SplashScreenAnimationStyles"

class SplashScreenAnimation extends Component {

    render() {
        return (
            <Animated.View style={styles.container}>
                <Animated.Image style={styles.image} source={Theme.i(Images.splashTransparent)} />
            </Animated.View>
        )
    }

}

export default SplashScreenAnimation;