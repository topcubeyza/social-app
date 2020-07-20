// Packages
import React, { Component } from "react"
import {View, Text} from "react-native"
import { connect } from "react-redux";
import TestActions from "../Redux/TestRedux"

class TestScreen extends Component {

componentDidMount() {
    this.props.getUsers();
}

    render() {
        console.log("rendering test screen with items: ", this.props.users)
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
        users: state.test.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(TestActions.usersRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);