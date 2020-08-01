import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import WelcomeScreen from "../Modules/Authorization/Screens/WelcomeScreen"
import SignupScreen from "../Modules/Authorization/Screens/SignupScreen"
import LoginWithEmailScreen from "../Modules/Authorization/Screens/LoginWithEmailScreen"
import UnverifiedUserScreen from "../Modules/Authorization/Screens/UnverifiedUserScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

// Components
import SignedOutHeader from "../Components/SignedOutHeader"

const SignedOutNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: false, showTitle: false, showRight: true, title: "Welcome"}),
                };
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: true, showTitle: true, showRight: false, title: "Signup"}),
                };
            }
        },
        LoginWithEmail: {
            screen: LoginWithEmailScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: true, showTitle: true, showRight: false, title: "Login"}),
                };
            }
        },
        UnverifiedUser: {
            screen: UnverifiedUserScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: false, showTitle: false, showRight: true}),
                };
            }
        },
        Incomplete: {
            screen: IncompleteScreen
        },
    },
    {
        initialRouteName: "Welcome",
    }
)

const getHeaderComponent = (props) => {
    return () => <SignedOutHeader {...props} />
}

export default SignedOutNavigator