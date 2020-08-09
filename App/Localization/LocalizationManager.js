import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from "react-redux"
import { addEventListener, removeEventListener } from "react-native-localize"
import { LocalizationActions } from '../Localization/Redux/LocalizationRedux'
import { getLanguageCode, LocaleTypes } from './index'

/**
 * Manages the locale type of the whole app
 */
class LocalizationManager extends Component {

    constructor(props) {
        super(props);

        this.firstRender = true;

        this.state = {
            languageCode: "",
        }
    }

    componentDidMount() {
        // If the localeType was not set in redux store before, set it to device locale
        // This condition occurs on the first launch of app when redux-persist hasn't yet persisted any locale state

        let localeType = this.props.locale.localeType ? this.props.locale.localeType : LocaleTypes.device

        this.setState({
            languageCode: getLanguageCode(localeType)
        }, () => {
            this.props.changeLocale(localeType)
        })

        // listen to device locale changes
        addEventListener("change", this.handleLocalizationChange)
    }

    componentWillUnmount() {
        removeEventListener("change", this.handleLocalizationChange)
    }

    /**
     * Called when the device locale changes.
     * If the locale type in redux store is 'device', then updates the languageCode in component state
     * and the locale type in redux store.
     * The reason to update it in redux store is for saga to update it in the Localization Tool,
     * so that it is reflected on the whole app
     */
    handleLocalizationChange = () => {
        if (this.props.locale.localeType == LocaleTypes.device) {
            this.setState({
                languageCode: getLanguageCode(LocaleTypes.device)
            }, () => {
                this.props.changeLocale(LocaleTypes.device)
            })
        }
    }

    render() {
        // Return null on the first render because the code in componentDidMount is necessary for the app
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