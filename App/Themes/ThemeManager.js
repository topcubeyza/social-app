import React, { createContext, useState, useEffect, Component, useContext } from 'react'
import { StatusBar } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect } from "react-redux"

import { ThemeActions } from "../Redux/ThemeRedux"
import Colors, { lightTheme, darkTheme, ThemeModes } from './Colors'

export const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext);

class ManageThemeProvider extends Component {

    constructor(props) {
        super(props);

        this.subscription

    }

    componentDidMount() {
        if (!this.props.theme.color) {
            this.setTheme(this.props.theme.themeMode, false)
        }
        this.subscription = Appearance.addChangeListener(({ colorScheme }) => {
            this.setTheme(colorScheme, true)
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    getColorMode = (themeMode) => {
        let colorMode = themeMode;
        if (themeMode == ThemeModes.device) {
            colorMode = Appearance.getColorScheme();
        }

        return colorMode;
    }

    getColorFunction = (themeMode) => {
        let theme;
        let colorMode = this.getColorMode(themeMode);
        theme = colorMode == ThemeModes.dark ? darkTheme : lightTheme;
        return (
            colorName => theme[colorName]
        )
    }

    setTheme = (themeMode, isDeviceTheme) => {
        if (!this.props.theme.themeMode == ThemeModes.device && isDeviceTheme) return;
        this.props.changeTheme({
            themeMode,
            colorFunction: this.getColorFunction(themeMode)
        })
    }

    render() {
        if (!this.props.theme.color) return null;
        return (
            <ThemeContext.Provider value={{ color: this.props.theme.color, setTheme: themeMode => this.setTheme(themeMode, false), themeMode: this.props.theme.themeMode }}>
                <>
                    <StatusBar
                        barStyle={this.getColorMode(this.props.theme.themeMode) === ThemeModes.light ? 'light-content' : 'dark-content'}
                    />
                    {this.props.children}
                </>
            </ThemeContext.Provider>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    changeTheme: ({ themeMode, colorFunction }) => dispatch(ThemeActions.changeTheme({ themeMode, color: colorFunction }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageThemeProvider);