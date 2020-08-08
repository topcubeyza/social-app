// Packages
import React, { Component } from "react"
import { connect } from "react-redux"

// RN Components
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from "react-native"

// Components

// Actions

// Utils
import { LocaleTypes, localized } from "../Localization"

// Styles
import getStyles from "./Styles/TabBarStyles"
import { Fonts, Metrics, SVG } from "../StylingConstants"
import { Colors, Images, themed } from '../Theming'

/**
 * @classdesc The component for Bottom Tab Bar in the Navigation
 */
class TabBarComponent extends Component {

    // *** RENDER METHODS *** //

    /**
     * Iterates through the routes in the tab navigation
     * Draws each tab with an icon. 
     * Icons are named exactly as the label of the route
     */
    renderTabs = (styles) => {
        const {
            getLabelText,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation
        } = this.props;

        const { routes, index: activeRouteIndex } = navigation.state;

        return (
            routes.map((route, routeIndex) => {
                let isRouteActive = routeIndex === activeRouteIndex;
                let tintColor = isRouteActive ? Colors.brandColor : Colors.midLightGrey_dm;
                let IconComponent = SVG[getLabelText({ route })]

                return (
                    <TouchableOpacity
                        key={routeIndex}
                        style={styles.tabContainer}
                        onPress={() => {
                            onTabPress({ route });
                        }}
                        onLongPress={() => {
                            onTabLongPress({ route });
                        }}
                        accessibilityLabel={getAccessibilityLabel({ route })}>

                        <IconComponent style={[styles.tabIcon, {color: themed.color(tintColor)}]} width={"100%"} height={"100%"}/>
                        
                    </TouchableOpacity>
                );
            })
        )
    }

    render() {
        let styles = getStyles(themed.color)

        // Tabbar renders differently in ios and android
        // The below structure renders the same in both platforms
        if (Platform.OS == "ios") {
            return (
                <SafeAreaView style={styles.containerSafeArea}>
                    <View style={styles.containerIOS}>
                        {this.renderTabs(styles)}
                    </View>
                </SafeAreaView>
            )
        }
        else {
            return (
                <View style={styles.containerAndroid}>
                    {this.renderTabs(styles)}
                </View>
            )
        }
    }

}

// Consuming locale and theme to immediately respond to changes in them
const mapStateToProps = state => ({
    locale: state.locale,
    theme: state.theme
})

export default connect(mapStateToProps)(TabBarComponent);