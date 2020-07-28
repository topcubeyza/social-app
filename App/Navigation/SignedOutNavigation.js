import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import WelcomeScreen from "../Modules/Authorization/Screens/WelcomeScreen"
import SignupScreen from "../Modules/Authorization/Screens/SignupScreen"
import LoginWithEmailScreen from "../Modules/Authorization/Screens/LoginWithEmailScreen"
import SendLinkScreen from "../Modules/Authorization/Screens/SendLinkScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

const SignedOutNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
        },
        Signup: {
            screen: SignupScreen
        },
        LoginWithEmail: {
            screen: LoginWithEmailScreen
        },
        SendLink: {
            screen: SendLinkScreen
        },
        Incomplete: {
            screen: IncompleteScreen
        }
    },
    {
        initialRouteName: "Welcome",
        headerMode: "none",
        navigationOptions: {
            headerTransparent: true
        }
    }
)

export default SignedOutNavigator