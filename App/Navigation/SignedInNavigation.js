import React from "react";
import { createStackNavigator } from "react-navigation"

import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"
import SignoutTestScreen from "../Modules/Authorization/Screens/SignoutTestScreen";

const SignedInNavigator = createStackNavigator({
    Test: {
        screen: SignoutTestScreen
    },
    Incomplete: {
        screen: IncompleteScreen
    }
})

export default SignedInNavigator