import React from "react";
import { createBottomTabNavigator } from "react-navigation"

// Components
import TabScreenHeader from "../Components/TabScreenHeader"
import TabBar from "../Components/TabBar";

// Screens
import HomeScreen from "../Modules/Home/Screens/HomeScreen"
import PreferencesScreen from "../Modules/Preferences/Screens/PreferencesScreen"



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

export default TabNavigator