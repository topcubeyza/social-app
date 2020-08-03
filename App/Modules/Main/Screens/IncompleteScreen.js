// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import I18n from "react-native-i18n"

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
import { Colors, Images, themed } from '../../../Theming'
import { TextNames } from "../../../I18n/languages/Names";

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
                    <Text style={styles.helloText}>{I18n.t(TextNames.heyCurious)}</Text>
                    <Text style={styles.subText}>{I18n.t(TextNames.pageUnderConstruction)}</Text>
                    <Text style={styles.subText}>{I18n.t(TextNames.exploreApp)}</Text>
                </View>
                <View style={styles.gobackButtonContainer}>
                    <Button
                        text={I18n.t(TextNames.goBack)}
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