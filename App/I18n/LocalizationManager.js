import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from "react-redux"
import { addEventListener, removeEventListener } from "react-native-localize"
import { LocalizationActions } from '../Redux/LocalizationRedux'
import { LocaleTypes } from './languages/Names'
import { getLanguageCode } from './Utils'

class LocalizationManager extends Component {

    constructor(props) {
        super(props);

        this.firstRender = true;

        this.state = {
            languageCode: "",
        }
    }

    componentDidMount() {
        let localeType = this.props.locale.localeType ? this.props.locale.localeType : LocaleTypes.device

        this.setState({
            languageCode: getLanguageCode(localeType)
        }, () => {
            this.props.changeLocale(localeType)
        })

        addEventListener("change", this.handleLocalizationChange)
    }

    componentWillUnmount() {
        removeEventListener("change", this.handleLocalizationChange)
    }

    handleLocalizationChange = () => {
        if (this.props.locale.localeType == LocaleTypes.device) {
            this.setState({
                code: getLanguageCode(LocaleTypes.device)
            }, () => {
                this.props.changeLocale(LocaleTypes.device)
            })
        }
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
        changeLocale: localeType => dispatch(LocalizationActions.changeLocaleRequest({localeType}))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationManager);