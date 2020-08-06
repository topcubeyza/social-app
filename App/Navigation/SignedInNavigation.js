import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Utils
import { Texts } from "../Localization"

// Components
import TabScreenHeader from "../Components/TabScreenHeader"
import StackScreenHeader from "../Components/StackScreenHeader"

// Screens
import HomeScreen from "../Modules/Home/Screens/HomeScreen"
import PreferencesScreen from "../Modules/Preferences/Screens/PreferencesScreen"
import ProfileScreen from "../Modules/Profile/Screens/ProfileScreen"
import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"
import SignoutTestScreen from "../Modules/Authorization/Screens/SignoutTestScreen";

// Styles
import { SVG } from "../StylingConstants"
import { themed, Colors } from "../Theming"


const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <SVG.Home width={"50%"} height={"50%"} color={tintColor} />
                )
            }
        },
        Preferences: {
            screen: PreferencesScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <SVG.Settings width={"57%"} height={"57%"} color={tintColor} />
                )
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            return {
                header: <TabScreenHeader navigation={navigation} />,
            };
        },
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeTintColor: themed.color(Colors.brandColor),
            inactiveTintColor: themed.color(Colors.midLightGrey_dm),
            
        }
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