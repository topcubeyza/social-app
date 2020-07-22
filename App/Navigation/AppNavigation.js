import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"

// Screens
import SignedInNavigation from "./SignedInNavigation"
import SignedOutNavigation from "./SignedOutNavigation"

const AuthorizationNavigator = createSwitchNavigator(
    {
        SignedIn: {
            screen: SignedInNavigation
        },
        SignedOut: {
            screen: SignedOutNavigation
        },
    },
    {
        initialRouteName: "SignedOut"
    }
)

export default createAppContainer(AuthorizationNavigator);