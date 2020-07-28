import { takeEvery, takeLatest, take, call, fork, put } from "redux-saga/effects"
import { AuthTypes, AuthActions } from "../Redux/AuthRedux"

function* signIn(api, action) {
    try {
        let { email, password } = action.payload;
        yield call(api.signIn, {email, password});
    } catch (error) {
        yield put(AuthActions.failure({error}))
    }
}

function* watchSignInRequest(api) {
    yield takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn, api)
}

function* sendLink(api, action) {
    try {
        let { email } = action.payload;
        yield put(AuthActions.candidateEmail({email}));
        yield call(api.sendLink, {email});
    } catch (error) {
        yield put(AuthActions.failure({error}))
    }
}

function* watchSendLinkRequest(api) {
    yield takeLatest(AuthTypes.SEND_LINK_REQUEST, sendLink, api)
}

function* signOut(api) {
    try {
        yield call(api.signOut);
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
    fork(watchSendLinkRequest, api),
    fork(watchSignOutRequest, api)
]

export default authSagas;