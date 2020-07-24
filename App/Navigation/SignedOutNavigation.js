import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import LoginScreen from "../Containers/Authorization/LoginScreen"
import SignupScreen from "../Containers/Authorization/SignupScreen"
import IncompleteScreen from "../Containers/IncompleteScreen"

const SignedOutNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Signup: {
            screen: SignupScreen
        },
        Incomplete: {
            screen: IncompleteScreen
        }
    },
    {
        initialRouteName: "Login",
        headerMode: "none",
        navigationOptions: {
            headerTransparent: true
        }
    }
)

export default SignedOutNavigator