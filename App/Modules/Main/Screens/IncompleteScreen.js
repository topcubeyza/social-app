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
import { Colors, Images, Theme } from '../../../Themes'
import { TextNames } from "../../../I18n/languages/Names";

class IncompleteScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onPress_BackButton = () => {
        this.props.navigation.goBack()
    }

    render() {
        let styles = getStyles(Theme.c)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={Theme.i(Images.underConstruction)} />
                </View>
                <View style={styles.textsContainer}>
                    <Text style={styles.helloText}>{I18n.t(TextNames.heyCurious)}</Text>
                    <Text style={styles.subText}>{I18n.t(TextNames.pageUnderConstruction)}</Text>
                    <Text style={styles.subText}>{I18n.t(TextNames.exploreApp)}</Text>
                </View>
                <View style={styles.gobackButtonContainer}>
                    <Button
                        text={I18n.t(TextNames.goBack)}
                        textColor={Theme.c(Colors.textOnBrandColor)}
                        onPress={this.onPress_BackButton}
                        backgroundColor={Theme.c(Colors.brandColor)}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

export default IncompleteScreen;