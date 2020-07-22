// Packages
import React, { Component } from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux";

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Components

// Styles
import Styles from "./Styles/SignupStyles"

class LoginScreen extends Component {

    render() {
        return (
            <View style={Styles.container}>
                <Text>SignupScreen</Text>
            </View>
        )
    }

}

export default LoginScreen;