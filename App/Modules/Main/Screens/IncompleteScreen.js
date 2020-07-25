// Packages
import React, { Component } from "react"
import { connect } from "react-redux";

// RN Components
import {
    View,
    Text,
    SafeAreaView,
    Image
} from "react-native"

// Components
import Button from "../../../Components/Button"

// Styles
import getStyles from "../Styles/IncompleteStyles"
import { Colors, Images, ThemeContext } from '../../../Themes'

class IncompleteScreen extends Component {

    static navigationOptions = {
        header: null
    }

    static contextType = ThemeContext

    onPress_BackButton = () => {
        this.props.navigation.goBack()
    }

    render() {
        let color = this.context.color
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
                        onPress={this.onPress_BackButton}
                        backgroundColor={color(Colors.brandColor)}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

export default IncompleteScreen;