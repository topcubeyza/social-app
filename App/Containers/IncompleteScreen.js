// Packages
import React, { Component } from "react"
import {
    View,
    Text,
    SafeAreaView,
    Image
} from "react-native"
import { connect } from "react-redux";

// Components
import Button from "../Components/Button"

// Styles
import getStyles from "./CommonStyles/IncompleteStyles"
import { Colors, Images } from '../Themes'
import { themed } from "../Themes/ThemeManager";

class IncompleteScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onBackButtonPress = () => {
        this.props.navigation.goBack()
    }

    render() {
        let color = this.props.theme.color
        let styles = getStyles(color)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={Images.underConstruction} />
                </View>
                <View style={styles.textsContainer}>
                    <Text style={styles.helloText}>Hey, curious!</Text>
                    <Text style={styles.subText}>This page is still under construction!</Text>
                    <Text style={styles.subText}>Feel free to go back and explore the app.</Text>
                </View>
                <View style={styles.gobackButtonContainer}>
                    <Button
                        text="Go Back"
                        textColor={color(Colors.textOnBrandColor)}
                        onPress={this.onBackButtonPress}
                        backgroundColor={color(Colors.brandColor)}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

export default themed(IncompleteScreen);