import {takeLatest, all} from 'redux-saga/effects';
 import API from '../Services/Api';
 import FirebaseAPI from "../Services/Firebase"
 import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';
import authSagas from "../Modules/Authorization/Redux/AuthSagas";
import localizationSagas from "../Localization/Redux/LocalizationSagas"
import themeSagas from '../Theming/Redux/ThemeSaga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const authAPI = DebugConfig.useFirebaseForAuthorization ? FirebaseAPI : api;

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    ...(authSagas(authAPI)),
    ...localizationSagas,
    ...themeSagas
  ]);
}
