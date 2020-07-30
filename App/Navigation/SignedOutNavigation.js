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
                    headerTransparent: true
                };
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: true, showTitle: true, showRight: false, title: "Signup"}),
                    headerTransparent: true
                };
            }
        },
        LoginWithEmail: {
            screen: LoginWithEmailScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: true, showTitle: true, showRight: false, title: "Login"}),
                    headerTransparent: true
                };
            }
        },
        UnverifiedUser: {
            screen: UnverifiedUserScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: getHeaderComponent({navigation, showLeft: false, showTitle: false, showRight: false}),
                    headerTransparent: true
                };
            }
        },
        Incomplete: {
            screen: IncompleteScreen
        },
    },
    {
        initialRouteName: "Welcome",
        navigationOptions: {
            headerTransparent: true,
            
        }
    }
)

const getHeaderComponent = (props) => {
    return () => <SignedOutHeader {...props} />
}

export default SignedOutNavigator