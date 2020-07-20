import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from "react-native";
import { connect } from "react-redux";
import { getUsersRequest, createUserRequest, deleteUserRequest } from "../Actions/users"

class TestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            disableDeleteForId: 0
        }

        this.props.getUsersRequest()
    }

    getDataForList = () => {
        let userList = this.props.users ? this.props.users : []
        userList.sort((a,b) => {
            if (a.id < b.id) return 1
            if (a.id > b.id) return -1
            return 0
        })
        return userList;
    }

    onFirstNameChange = (text) => {
        this.setState({
            firstName: text
        })
    }

    onLastNameChange = (text) => {
        this.setState({
            lastName: text
        })
    }

    onCreateUserPress = () => {
        this.setState({
            firstName: "",
            lastName: ""
        })

        let { firstName, lastName } = this.state
        this.props.createUserRequest({
            firstName, 
            lastName
        })
    }

    onDeleteUserPress = (id) => {
        this.setState({
            disableDeleteForId: id
        })
        this.props.deleteUserRequest({id})
    }

    renderUser = ({ item }) => {
        let deleteDisabled = false;//this.state.disableDeleteForId == item.id;
        return (
            <View style={{flex:1, backgroundColor: "white", flexDirection: "row", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, alignItems: "center"}}>
                <View style={{flex: 0.3}}>
                    <Text style={{fontSize: 16}}>{item.firstName}</Text>
                </View>
                <View style={{flex: 0.5}}>
                    <Text style={{fontSize: 14}}>{item.lastName}</Text>
                </View>
                <View style={{flex: 0.2, alignItems: "flex-end"}}>
                    <TouchableOpacity 
                        disabled={deleteDisabled}
                        onPress={() => this.onDeleteUserPress(item.id)}
                        style={{borderColor: deleteDisabled ? "#aaa" : "#eb4034", borderWidth: 1, padding: 5, borderRadius: 5}}>
                        <Text style={{fontSize: 14, color: deleteDisabled ? "#aaa" : "#eb4034", fontWeight: "bold"}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderListEmpty = () => {
        return <View><Text>Loading...</Text></View>
    }

    renderListSeparator = () => {
        return <View style={{flex:1, height:1, backgroundColor: "lightgrey"}}></View>
    }

    render() {
        let disabled = !this.state.firstName || !this.state.lastName;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 0.25, padding: 10 }}>
                    <View style={{ flex: 1 / 3, borderRadius: 10, borderColor: "grey", borderWidth: 1, backgroundColor: "white", margin: 10, justifyContent: "center", paddingLeft: 20 }}>
                        <TextInput 
                            value={this.state.firstName}
                            onChangeText={this.onFirstNameChange} 
                            placeholder="Name"
                            autoCorrect={false} />
                    </View>
                    <View style={{ flex: 1 / 3, borderRadius: 10, borderColor: "grey", borderWidth: 1, backgroundColor: "white", margin: 10, justifyContent: "center", paddingLeft: 20 }}>
                        <TextInput 
                            value={this.state.lastName}
                            onChangeText={this.onLastNameChange} 
                            placeholder="Surname" 
                            autoCorrect={false}/>
                    </View>
                    <TouchableOpacity 
                        disabled={disabled}
                        onPress={this.onCreateUserPress}
                        style={{ flex: 1 / 3, borderRadius: 10, borderColor: disabled? "#aaa" : "#00aeff", borderWidth: 1, margin: 10, justifyContent: "center", alignItems: "center", paddingLeft: 20 }}>
                        <Text style={{ color: disabled? "#aaa" : "#00aeff", fontSize: 20, fontWeight: "bold" }}>CREATE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.75, padding: 10, }}>
                    <FlatList
                        data={this.getDataForList()}
                        renderItem={this.renderUser}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={this.renderListEmpty}
                        ItemSeparatorComponent={this.renderListSeparator}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.items
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUsersRequest: () => dispatch(getUsersRequest()),
    createUserRequest: ({firstName, lastName}) => dispatch(createUserRequest({firstName, lastName})),
    deleteUserRequest: ({id}) => dispatch(deleteUserRequest({id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);