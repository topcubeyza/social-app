import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from "react-redux"

import { ThemeActions } from "../Redux/ThemeRedux"
import { getColorMode, ThemeModes } from './Theme'

class ThemeManager extends Component {

    constructor(props) {
        super(props);

        this.subscription
        this.firstTime = true

    }

    componentDidMount() {
        debugger;
        let themeMode = this.props.theme.themeMode ? this.props.theme.themeMode : ThemeModes.device

        this.props.changeTheme(themeMode)
    }

    render() {
        debugger;
        if (this.firstTime) {
            this.firstTime = false;
            return null;
        }
        return (
            <>
                <StatusBar
                    barStyle={getColorMode(this.props.theme.themeMode) === ThemeModes.light ? 'light-content' : 'dark-content'}
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