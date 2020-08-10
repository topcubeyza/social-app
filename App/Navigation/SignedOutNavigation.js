import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Utils
import { Texts } from "../Localization"

// Screens
import WelcomeScreen from "../Modules/Authorization/Screens/WelcomeScreen"
import SignupScreen from "../Modules/Authorization/Screens/SignupScreen"
import LoginWithEmailScreen from "../Modules/Authorization/Screens/LoginWithEmailScreen"
import UnverifiedUserScreen from "../Modules/Authorization/Screens/UnverifiedUserScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

// Components
import SignedOutHeader from "../Components/SignedOutHeader"


const getNavigationOptions = (props) => ({ navigation }) => {
    return {
        header: () => <SignedOutHeader {...props} navigation={navigation} />,
    }
}

const SignedOutNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: getNavigationOptions({ showRight: true })
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: getNavigationOptions({
                showLeft: true,
                showTitle: true,
                title: Texts.screenTitles.titleSignup
            })
        },
        LoginWithEmail: {
            screen: LoginWithEmailScreen,
            navigationOptions: getNavigationOptions({
                showLeft: true,
                showTitle: true,
                title: Texts.screenTitles.titleLogin
            })
        },
        UnverifiedUser: {
            screen: UnverifiedUserScreen,
            navigationOptions: getNavigationOptions({ showRight: true })
        },
        Incomplete: {
            screen: IncompleteScreen
        },
    },
    {
        initialRouteName: "Welcome",
    }
)

export default SignedOutNavigator