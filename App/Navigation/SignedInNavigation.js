import React from "react";
import { createStackNavigator } from "react-navigation"

// Utils
import { Texts } from "../Localization"

// Components
import StackScreenHeader from "../Components/StackScreenHeader"

// Screens
import ProfileScreen from "../Modules/Profile/Screens/ProfileScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

// Navigators
import TabNavigator from "./TabNavigation"


const SignedInNavigator = createStackNavigator(
    {
        Tabs: TabNavigator,
        Profile: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    header: <StackScreenHeader navigation={navigation} title={Texts.screenTitles.titleProfile} />,
                };
            }
        },
        Incomplete: {
            screen: IncompleteScreen
        }
    },
    {
        
    }
)

export default SignedInNavigator