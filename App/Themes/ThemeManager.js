import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from "react-redux"
import { Appearance } from "react-native-appearance"

import { ThemeActions } from "../Redux/ThemeRedux"
import Theme, { getColorMode, ThemeModes } from './Theme'

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
        let themeMode = this.props.theme.themeMode ? this.props.theme.themeMode : ThemeModes.device

        this.subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (this.props.theme.themeMode == ThemeModes.device) {
                this.setState({
                    colorMode: getColorMode(ThemeModes.device)
                }, () => {
                    this.props.changeTheme(ThemeModes.device)
                })
            }
        });

        this.setState({
            colorMode: getColorMode(themeMode)
        }, () => {
            this.props.changeTheme(themeMode)
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {
        if (this.firstTime) {
            this.firstTime = false;
            return null;
        }
        return (
            <>
                <StatusBar
                    backgroundColor={Theme.c(Colors.lightBackground_dm)}
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