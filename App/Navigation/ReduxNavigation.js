// Packages
import React, { Component } from "react"
import { BackHandler, Platform } from "react-native"
import {
    createReactNavigationReduxMiddleware,
    createReduxContainer
} from "react-navigation-redux-helpers"
import { connect } from "react-redux"

// Project files
import AppNavigation from "./AppNavigation"


export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
    (state) => state.nav,
    "root"
)

const ReduxAppNavigator = createReduxContainer(AppNavigation, "root")

class ReduxNavigation extends Component {

    componentDidMount() {
        if (Platform.OS == "ios") return;

        BackHandler.addEventListener('hardwareBackPress', () => {
            const { dispatch, nav } = this.props;
            // if this is we are on the first screen, block back press
            if (nav.routes.length == 1 && (nav.routes[0].routeName === "TestScreen")) {
                return false;
            }

            dispatch({ type: "Navigation/BACK" })
            return true;
        })
    }

    componentWillUnmount() {
        if (Platform.OS == "ios") return;

        BackHandler.removeEventListener("hardwareBackPress", undefined);
    }

    render() {
        return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
    }
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps)(ReduxNavigation)