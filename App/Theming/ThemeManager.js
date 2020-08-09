import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from "react-redux"
import { Appearance } from "react-native-appearance"

import { ThemeActions } from "./Redux/ThemeRedux"
import { getColorMode, ThemeModes, themed } from './index'

/**
 * Manages the theme mode of the whole app
 */
class ThemeManager extends Component {

    constructor(props) {
        super(props);

        this.subscription;
        this.firstTime = true

        this.state = {
            colorMode: ""
        }

    }

    componentDidMount() {
        // If the themeMode was not set in redux store before, set it to device theme
        // This condition occurs on the first launch of app when redux-persist hasn't yet persisted any theme state
        let themeMode = this.props.theme.themeMode ? this.props.theme.themeMode : ThemeModes.device

        // Listen to device theme changes
        this.subscription = Appearance.addChangeListener(this.handleThemeChange);

        this.setState({
            colorMode: getColorMode(themeMode)
        }, () => {
            this.props.changeTheme(themeMode)
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    /**
     * Called when the device theme changes.
     * If the theme mode in redux store is 'device', then updates the colorMode in component state
     * and the themeMode in redux store.
     * The reason to update it in redux store is for saga to update it in the global variable,
     * so that it is reflected on the whole app
     */
    handleThemeChange = ({ colorScheme }) => {
        if (this.props.theme.themeMode == ThemeModes.device) {
            this.setState({
                colorMode: getColorMode(ThemeModes.device)
            }, () => {
                this.props.changeTheme(ThemeModes.device)
            })
        }
    }

    render() {
        // Return null on the first render because the code in componentDidMount is necessary for the app
        if (this.firstTime) {
            this.firstTime = false;
            return null;
        }
        return (
            <>
                <StatusBar
                    backgroundColor={themed.color(Colors.lightBackground_dm)}
                    barStyle={getColorMode(this.props.theme.themeMode) === ThemeModes.light ? 'dark-content' : 'light-content'}
                />
                {this.props.children}
            </>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    changeTheme: (themeMode) => dispatch(ThemeActions.changeThemeRequest({ themeMode }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeManager);