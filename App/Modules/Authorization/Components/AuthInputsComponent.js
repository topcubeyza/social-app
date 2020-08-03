// Packages
import React, { Component } from "react"

// RN Components
import {
    View,
} from "react-native"

// Components
import SingleLineInput from "../../../Components/SingleLineInput"

// Styles
import getStyles from "../Styles/CommonStyles"
import { Colors, themed } from '../../../Theming'

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
                    onFocus={() => props.onFocus(inputKey)}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={text => props.onChangeText(text, inputKey)}
                    secureTextEntry={type == "password"}
                />
            </View>
        )

}

export default AuthInputsComponent;