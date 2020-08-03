// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import validate from "validate.js"

// RN Components

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import { Texts, localized } from "../../../Localization";

class LoginWithEmailScreen extends Component {

    // *** EVENT HANDLERS *** //

    loginRequest = ({email, password}) => {
        this.props.signInRequest({email, password})
    }

    onPress_Back = () => {
        this.props.navigation.navigate("Welcome");
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <AuthScreensWrapper
                headerText={localized.text(Texts.login)}
                textInputsParams={[
                    { inputKey: "email", placeholder: localized.text(Texts.email), type: "email" },
                    { inputKey: "password", placeholder: localized.text(Texts.password), type: "password" },
                ]}
                topButtonText={localized.text(Texts.login)}
                transparentButtonText={localized.text(Texts.forgotPassword)}
                onPress_TransparentButton={this.onPress_Back}
                request={this.loginRequest}
                onRequestSuccess={() => {}}
                dataFieldName="user"
                isDataValid={data => true}
            />
        )
    }

}

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.locale,
})

const mapDispatchToProps = dispatch => ({
    signInRequest: ({ email, password }) => dispatch(AuthActions.signInRequest({ email, password })),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmailScreen);