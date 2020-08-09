// Packages
import React, { Component } from "react"
import PropTypes from "prop-types"

// RN Components
import {
    View,
} from "react-native"

// Components
import SingleLineInput from "../../../Components/SingleLineInput"

// Styles
import getStyles from "../Styles/CommonStyles"
import { Colors, themed } from '../../../Theming'

/**
 * A convenience component to use for TextInputs in Auth Screens
 * @augments {Component<Props,State>}
 */
const AuthInputsComponent = (props) => {
        let styles = getStyles(themed.color)
        let { reference, inputKey, onFocus, placeholder, value, onChangeText, type, autoFocus } = props;
        return (
            <View style={styles.textinputContainer}>
                <SingleLineInput
                    autoFocus={autoFocus}
                    ref={reference}
                    keyboardType={type == "email" ? "email-address" : "default"}
                    autoCapitalize= {(type == "email" || type == "password") ? "none" : null}
                    key={inputKey}
                    onFocus={() => onFocus(inputKey)}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={text => onChangeText(text, inputKey)}
                    secureTextEntry={type == "password"}
                />
            </View>
        )

}

AuthInputsComponent.propTypes = {
    /** The ref function to pass on to SingleLineInput */
    reference: PropTypes.func, 
    /** The 'key' property to pass on to SingleLineInput */
    inputKey: PropTypes.any.isRequired, 
    /** Default value: () => {} */
    onFocus: PropTypes.func, 
    placeholder: PropTypes.string.isRequired, 
    value: PropTypes.string, 
    /** Default value: () => {} */
    onChangeText: PropTypes.func, 
    /** 'email', 'password', or 'text' */
    type: PropTypes.string.isRequired, 
    /** Default value: true */
    autoFocus: PropTypes.bool,
}

AuthInputsComponent.defaultProps = {
    reference: () => {}, 
    onFocus: () => {}, 
    onChangeText: () => {}, 
    autoFocus: true
}

export default AuthInputsComponent;