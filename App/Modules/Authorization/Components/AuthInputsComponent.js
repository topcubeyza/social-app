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
import { Colors, Theme } from '../../../Themes'

const AuthInputsComponent = (props) => {
        let styles = getStyles(Theme.c)
        let { reference, inputKey, onFocus, placeholder, value, onChangeText, type} = props;
        return (
            <View style={styles.textinputContainer}>
                <SingleLineInput
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