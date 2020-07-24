import auth from "@react-native-firebase/auth"

const signIn = ({email, password}) => {
    
}

const createUser = async ({email, password}) => {
    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
          })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                throw 'That email address is already in use!'
              }
          
              if (error.code === 'auth/invalid-email') {
                throw 'That email address is invalid!'
              }

              if (error.code === 'auth/weak-password') {
                throw 'Password is too weak!'
              }
        })
}

const signOut = () => {

}

export default {
    signIn,
    createUser,
    signOut
}