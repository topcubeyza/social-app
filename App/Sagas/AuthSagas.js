import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { AuthTypes, AuthActions } from "../Redux/AuthRedux"

function* signIn(api) {
    try {
        let { email, password } = action.payload;
        const result = yield call(api.signIn, {email, password});
        console.log(result)
        yield; //put(AuthActions.success())
    } catch (error) {
        yield put(AuthActions.failure({error}))
    }
}

function* watchSignInRequest(api) {
    yield takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn, api)
}

function* createUser(api, action) {
    debugger;
    try {
        console.log("create user saga", action)
        let { email, password } = action.payload;
        const result = yield call(api.createUser, {email, password});
        debugger;
        console.log("create user result", result)
        yield;
    } catch (error) {
        console.log(error)
        debugger;
        yield put(AuthActions.failure({error}))
    }
}

function* watchCreateUserRequest(api) {
    console.log("watcher for create user:")
    yield takeLatest(AuthTypes.CREATE_USER_REQUEST, createUser, api)
}

function* signOut(api) {
    try {
        const result = yield call(api.signOut);
        console.log(result)
        yield;
    } catch (error) {
        yield put(AuthActions.failure({error}))
    }
}

function* watchSignOutRequest(api) {
    while(true) {
        let action = yield take(AuthTypes.SIGN_OUT_REQUEST);
        yield call(signOut, api)
    }
}

const authSagas = (api) => [
    fork(watchSignInRequest, api),
    fork(watchCreateUserRequest, api),
    fork(watchSignOutRequest, api)
]

export default authSagas;