import { takeEvery, takeLatest, take, call, fork, put, delay } from "redux-saga/effects"
import { AuthTypes, AuthActions } from "../Redux/AuthRedux"
import validate from "validate.js";
import moment from "moment";

let pauseReloading = false;

function* manageChangedAuthState(api, action) {
    try {
        let state = action.payload ? action.payload.state : action.state
        let user = (state && state._user) ? state._user : state;

        if ((user && user.emailVerified) || user == null) {
            yield put(AuthActions.setUser({ user }))
        }
        else if (user && user.displayName) {
            yield put(AuthActions.setCandidateUser({ user }))
            let authState = state;
            while (!user.emailVerified) {
                user = (authState && authState._user) ? authState._user : authState;
                let delayed = yield delay(1000, true)
                if (!pauseReloading) {
                    authState = yield call(api.reloadUser);
                }
            }
            yield put(AuthActions.setUser({ user }))
        }
    } catch (error) {
        if (validate.isString(error)) {
            yield put(AuthActions.failure({ error }))
        }
    }
}

function* watchAuthStateChange(api) {
    yield takeLatest(AuthTypes.AUTH_STATE_CHANGE, manageChangedAuthState, api)
}

function* signIn(api, action) {
    try {
        let { email, password } = action.payload;
        yield call(api.signIn, { email, password });
    } catch (error) {
        if (validate.isString(error)) {
            yield put(AuthActions.failure({ error }))
        }
    }
}

function* watchSignInRequest(api) {
    yield takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn, api)
}

function* createUser(api, action) {
    try {
        let { email, password, displayName } = action.payload;
        yield put(AuthActions.setCandidateUser({ user: null }));
        yield call(api.createUser, { email, password });
        yield call(api.updateUserProfile, { displayName })
        yield call(api.sendVerificationEmail);
        let user = yield call(api.reloadUser)
        yield call(manageChangedAuthState, api, { payload: { state: user } })
    } catch (error) {
        if (validate.isString(error)) {
            yield put(AuthActions.failure({ error }))
        }
    }
}

function* watchCreateUserRequest(api) {
    yield takeLatest(AuthTypes.CREATE_USER_REQUEST, createUser, api)
}

function* signOut(api) {
    try {
        yield call(api.signOut);
    } catch (error) {
        if (validate.isString(error)) {
            yield put(AuthActions.failure({ error }))
        }
    }
}

function* watchSignOutRequest(api) {
    while (true) {
        let action = yield take(AuthTypes.SIGN_OUT_REQUEST);
        yield call(signOut, api)
    }
}

const authSagas = (api) => [
    fork(watchAuthStateChange, api),
    fork(watchSignInRequest, api),
    fork(watchCreateUserRequest, api),
    fork(watchSignOutRequest, api)
]

export default authSagas;