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

// Utils
import { Texts, localized } from "../../../Localization"

// Styles
import getStyles from "../Styles/IncompleteStyles"
import { Colors, Images, themed } from '../../../Theming'

class IncompleteScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onPress_BackButton = () => {
        this.props.navigation.goBack()
    }

    render() {
        let styles = getStyles(themed.color)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={themed.image(Images.underConstruction)} />
                </View>
                <View style={styles.textsContainer}>
                    <Text style={styles.helloText}>{localized.text(Texts.heyCurious)}</Text>
                    <Text style={styles.subText}>{localized.text(Texts.pageUnderConstruction)}</Text>
                    <Text style={styles.subText}>{localized.text(Texts.exploreApp)}</Text>
                </View>
                <View style={styles.gobackButtonContainer}>
                    <Button
                        text={localized.text(Texts.goBack)}
                        textColor={themed.color(Colors.textOnBrandColor)}
                        onPress={this.onPress_BackButton}
                        backgroundColor={themed.color(Colors.brandColor)}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

export default IncompleteScreen;