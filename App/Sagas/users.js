import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import * as actions from "../Actions/users"
import API from "../Services/Api"
import { YellowBox } from "react-native";

const api = API.create();

function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        let users = result.data.data;
        yield put(actions.getUsersSuccess({
            items: users
        }))
    } catch (error) {

    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

function* createUser(action) {
    try {
        let {firstName, lastName} = action.payload;
        yield call(api.createUser, {firstName, lastName});
        yield call(getUsers);
    } catch (error) {
        
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* deleteUser({id}) {
    try {
        yield call(api.deleteUser, {id});
        yield call(getUsers);
    } catch (error) {
        
    }
}

function* watchDeleteUserRequest() {
    while(true) {
        let action = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, {id: action.payload.id})
    }
    yield takeLatest(actions.Types.DELETE_USER_REQUEST, deleteUser)
}

const userSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
]

export default userSagas;