// Packages
import React, { Component } from "react"
import {View, Text} from "react-native"
import { connect } from "react-redux";

// Actions
import TestActions from "../Redux/TestRedux"
import { AuthActions } from "../Redux/AuthRedux"

class TestScreen extends Component {

componentDidMount() {
    this.props.getUsers();
    //this.props.createUser({email: "firstemail@mail.com", password: "abcd1234"});
}

    render() {
        return (
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <Text>Test</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.test.items,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(TestActions.usersRequest()),
        createUser: ({email, password}) => dispatch(AuthActions.createUserRequest({email, password}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);