import auth from "@react-native-firebase/auth"

const signIn = ({email, password}) => {
    
}

const createUser = async ({email, password}) => {
    debugger;
    let promise = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            debugger;
            console.log('User account created & signed in!');
            return null;
          })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                throw 'That email address is already in use!'
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                throw 'That email address is invalid!'
              }

              if (error.code === 'auth/weak-password') {
                console.log('Password is too weak!');
                throw 'Password is too weak!'
              }
          
              console.error(error);
        })
          
    return promise;
}

const signOut = () => {

}

export default {
    signIn,
    createUser,
    signOut
}