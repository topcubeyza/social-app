import { takeEvery, takeLatest, take, call, fork, put, delay } from "redux-saga/effects"
import { AuthTypes, AuthActions } from "../Redux/AuthRedux"
import validate from "validate.js";
import moment from "moment";

// Saga that manages the new auth state
function* manageChangedAuthState(api, action) {
    try {
        let state = action.payload ? action.payload.state : action.state
        // get the 'user', it may be the _user property of the state, or it may be the state itself
        let user = (state && state._user) ? state._user : state;

        // If the user is null, then the auth state is signed out
        // If the user's email is verified, then auth state is signed in
        // In both cases, put the user in redux state
        if ((user && user.emailVerified) || user == null) {
            yield put(AuthActions.setUser({ user }))
        }
        // Else, there is a user with unverified email.
        // Check if this user's displayName is set
        // Because, when a user is created first but not yet updated with the displayName,
        // we do not want to go ahead and show a no-name ui.
        else if (user && user.displayName) {
            // Put the user as a candidate user in Redux state
            yield put(AuthActions.setCandidateUser({ user }))

            // Define the reloaded state
            let reloadedState;
            
            // Reload the user until the email is verified, with 1 second delay between each reload
            while (!user.emailVerified) {
                let delayed = yield delay(1000, true)
                reloadedState = yield call(api.reloadUser);
                user = (reloadedState && reloadedState._user) ? reloadedState._user : reloadedState;
            }

            // After email is verified, put the user in redux state
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

        // Call the API's sign in method with email and password
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

        // Remove the previous candidate user from redux state
        yield put(AuthActions.setCandidateUser({ user: null }));

        // Call the API's createUser method with the email and password
        yield call(api.createUser, { email, password });

        // Update the user with the displayName
        yield call(api.updateUserProfile, { displayName })

        // Send the verification email
        yield call(api.sendVerificationEmail);

        // Reload the user to get a user with the displayName
        let user = yield call(api.reloadUser)

        // Mock authStateChange action, because firebase does not change the auth state upon updating the user displayName
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
        // Call the API's signout method
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