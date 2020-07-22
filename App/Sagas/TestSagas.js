import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import TestActions, { TestTypes } from "../Redux/TestRedux"

function* getUsers(api) {
    try {
        const result = yield call(api.getUsers);
        let users = result.data.data;
        yield put(TestActions.usersSuccess({
            items: users
        }))
    } catch (error) {

    }
}

function* watchGetUsersRequest(api) {
    yield takeEvery(TestTypes.USERS_REQUEST, getUsers, api)
}

const userSagas = (api) => [
    fork(watchGetUsersRequest, api),
]

export default userSagas;