import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import LoginScreen from "../Modules/Authorization/Screens/LoginScreen"
import SignupScreen from "../Modules/Authorization/Screens/SignupScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

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