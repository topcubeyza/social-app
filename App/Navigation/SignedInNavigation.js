import React from "react";
import { createStackNavigator } from "react-navigation"

import TestScreen from "../Containers/TestScreen"

const SignedInNavigator = createStackNavigator({
    Test: {
        screen: TestScreen
    }
})

export default SignedInNavigator