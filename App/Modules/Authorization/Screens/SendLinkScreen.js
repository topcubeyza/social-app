// Packages
import React, { Component } from "react"
import { connect } from "react-redux";
import { duration } from "moment";
import I18n from "react-native-i18n";

// RN Components

// Components
import AuthScreensWrapper from "../Components/AuthScreensWrapper"

// Actions
import { AuthActions } from "../Redux/AuthRedux"

// Styles
import { TextNames } from "../../../I18n/languages/Names";

class SendLinkScreen extends Component {

    // *** EVENT HANDLERS *** //

    sendLinkRequest = ({email}) => {
        this.props.sendLinkRequest({ email })
    }

    onSendLinkSuccess = () => {
        
    }

    onPress_LoginInstead = () => {
        this.props.navigation.navigate("Welcome");
    }

    // *** RENDER METHODS *** //

    render() {
        return (
            <AuthScreensWrapper
                headerText={I18n.t(TextNames.signup)}
                textInputsParams={[
                    { inputKey: "email", placeholder: I18n.t(TextNames.email), type: "email" },
                ]}
                topButtonText={I18n.t(TextNames.sendLink)}
                transparentButtonText={I18n.t(TextNames.loginInstead)}
                onPress_TransparentButton={this.onPress_LoginInstead}
                request={this.sendLinkRequest}
                onRequestSuccess={this.onSendLinkSuccess}
            />
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    sendLinkRequest: ({ email }) => dispatch(AuthActions.sendLinkRequest({ email })),
})

export default connect(null, mapDispatchToProps)(SendLinkScreen);