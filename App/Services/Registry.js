import auth from '@react-native-firebase/auth';
import {AuthActions} from "../Redux/AuthRedux"
import { store } from "../Containers/App"

let subscriber;
export const registerToEvents = () => {
    subscriber = auth().onAuthStateChanged(user => {
        debugger;
        console.log(user)
        store.dispatch(AuthActions.authStateChange(user)) 
    });
}

export const unregisterFromEvents = () => {
    subscriber.unsubscribe();
}