import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import LoginScreen from "../Containers/LoginScreen"
import SignupScreen from "../Containers/SignupScreen"
import IncompleteScreen from "../Containers/IncompleteScreen"

const SignedOutNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
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
        navigationOptions: {
            headerTransparent: true
        }
    }
)

export default SignedOutNavigator