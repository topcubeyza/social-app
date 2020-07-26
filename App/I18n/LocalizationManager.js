import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from "react-redux"
import I18n from "react-native-i18n"
import { LocalizationActions } from '../Redux/LocalizationRedux'
import { LanguageCodes } from './languages/Names'
import { NativeModules } from 'react-native'

class LocalizationManager extends Component {

    constructor(props) {
        super(props);

        this.firstRender = true;
    }

    componentDidMount() {
        let languageCode = this.props.locale.languageCode ? this.props.locale.languageCode : LanguageCodes.device

        this.props.changeLocale(languageCode)
    }

    render() {
        if (this.firstRender) {
            this.firstRender = false;
            return null;
        }
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

const mapStateToProps = state => ({
    locale: state.locale
})

const mapDispatchToProps = dispatch => {
    return ({
        changeLocale: languageCode => dispatch(LocalizationActions.changeLocaleRequest({languageCode}))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationManager);