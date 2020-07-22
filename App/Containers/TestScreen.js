// Packages
import React, { Component } from "react"
import {View, Text} from "react-native"
import { connect } from "react-redux";
import TestActions from "../Redux/TestRedux"
import { AuthActions } from "../Redux/AuthRedux"

class TestScreen extends Component {

componentDidMount() {
    this.props.getUsers();
    this.props.createUser({email: "alsdjlasd@lasdj.com", password: "abcd1234"});
}

    render() {
        console.log("rendering test screen with user: ", this.props.user)
        return (
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <Text>Test</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("mapStateToProps : state :", state)
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