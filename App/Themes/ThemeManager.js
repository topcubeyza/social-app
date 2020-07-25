import React, { createContext, useState, useEffect, Component, useContext } from 'react'
import { StatusBar } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
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

    getColorFunction = (themeMode) => {
        let theme;
        let colorMode = themeMode;
        if (themeMode == ThemeModes.device) {
            colorMode = Appearance.getColorScheme();
        }
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
                        barStyle={this.props.theme.themeMode === ThemeModes.light ? 'light-content' : 'dark-content'}
                    />
                    {this.props.children}
                </>
            </ThemeContext.Provider>
        )
    }
}

const ThemeManager = ({ children }) => {
    let ReduxThemeProvider = connect(mapStateToProps, mapDispatchToProps)(ManageThemeProvider);
    return (
        (
            <AppearanceProvider>
                <ReduxThemeProvider>{children}</ReduxThemeProvider>
            </AppearanceProvider>
        )
    )
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    changeTheme: ({ themeMode, colorFunction }) => dispatch(ThemeActions.changeTheme({ themeMode, color: colorFunction }))
})

export default ThemeManager;