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
import styles from "./Styles/IncompleteStyles"
import { Colors, Images } from '../Themes'

class IncompleteScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onBackButtonPress = () => {
        console.log(this.props.navigation);
        this.props.navigation.goBack()
    }

    render() {
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
                        textColor={Colors.lightTextColor}
                        onPress={this.onBackButtonPress}
                        backgroundColor={Colors.brandColor}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

export default IncompleteScreen;