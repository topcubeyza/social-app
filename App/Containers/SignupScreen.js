// Packages
import React, { Component } from "react"
import {
    View,
    Text,
    SafeAreaView
} from "react-native"
import { connect } from "react-redux";
import _ from "lodash"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Components
import Button from "../Components/Button"

// Styles
import styles from "./Styles/SignupStyles"
import { Colors } from '../Themes'

class SignupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordConfirm: ""
        }
    }

    onLoginPress = () => {
        this.props.navigation.navigate("Incomplete")
    }

    onLoginInsteadPress = () => {
        this.props.navigation.navigate("Login");
    }

    isSignupButtonDisabled = () => {
        let {email, password, passwordConfirm} = this.state
        if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(passwordConfirm)) {
            console.log("empty input")
            return true;
        }
        if (_.isEqual(password, passwordConfirm)) {
            return true;
        }

        return false;
    }

    render() {
        let signupButtonDisabled = this.isSignupButtonDisabled()
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.bemagineText}>Bemagine</Text>
                        <Text style={styles.subText}>Where imagination meets hardwork</Text>
                    </View>
                    <View style={styles.loginButtonsContainer}>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text="Login with Google"
                                textColor={Colors.lightTextColor}
                                onPress={this.onLoginPress}
                                backgroundColor={Colors.googleColor}
                            />
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <Button
                                text="Login with Email"
                                textColor={Colors.lightTextColor}
                                onPress={this.onLoginPress}
                                backgroundColor={Colors.brandColor}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomContainer}>
                    <View style={styles.signupButtonContainer}>
                        <Button
                            disable={signupButtonDisabled}
                            text="Sign up"
                            textColor={Colors.lightTextColor}
                            onPress={this.onLoginPress}
                            backgroundColor={signupButtonDisabled ? Colors.darkTextColor : Colors.brandColor}
                        />
                    </View>
                    <View style={styles.forgotPassContainer}>
                        <Button
                            text="Login instead?"
                            textColor={Colors.midGrey}
                            onPress={this.onLoginInsteadPress}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }

}

export default SignupScreen;