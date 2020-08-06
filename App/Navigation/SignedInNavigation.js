import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Utils
import { Texts } from "../Localization"

// Components
import TabScreenHeader from "../Components/TabScreenHeader"
import StackScreenHeader from "../Components/StackScreenHeader"
import TabBar from "../Components/TabBar";

// Screens
import HomeScreen from "../Modules/Home/Screens/HomeScreen"
import PreferencesScreen from "../Modules/Preferences/Screens/PreferencesScreen"
import ProfileScreen from "../Modules/Profile/Screens/ProfileScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"
import SignoutTestScreen from "../Modules/Authorization/Screens/SignoutTestScreen";



const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Preferences: {
            screen: PreferencesScreen,
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            return {
                header: <TabScreenHeader navigation={navigation} />,
            };
        },
        tabBarComponent: TabBar
    }
)

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