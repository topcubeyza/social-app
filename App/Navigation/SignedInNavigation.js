import React from "react";
import { createStackNavigator } from "react-navigation"

import IncompleteScreen from "../Modules/Main/Screens/IncompleteScreen"

const SignedInNavigator = createStackNavigator({
    Test: {
        screen: IncompleteScreen
    }
})

export default SignedInNavigator