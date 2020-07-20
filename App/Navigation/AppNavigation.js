import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"

// Screens
import TestScreen from "../Containers/TestScreen"

const TestNavigator = createStackNavigator({
    Test: TestScreen
})

export default createAppContainer(TestNavigator);