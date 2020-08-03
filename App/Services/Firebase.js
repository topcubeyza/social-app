import auth from "@react-native-firebase/auth"
import { Texts, localized, getCurrentLocale } from "../Localization"

const signIn = async ({ email, password }) => {
  console.log("fb: signin")
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        throw localized.text(Texts.errorMessages.invalidEmail)
      }

      if (error.code === 'auth/user-not-found') {
        throw localized.text(Texts.errorMessages.userNotFound)
      }

      if (error.code === 'auth/wrong-password') {
        throw localized.text(Texts.errorMessages.wrongPassword)
      }

      throw localized.text(Texts.genericError)
    })
}

const createUser = async ({ email, password }) => {
  console.log("fb: createUser")
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        throw localized.text(Texts.errorMessages.emailAddressAlreadyInUse)
      }

      if (error.code === 'auth/invalid-email') {
        throw localized.text(Texts.errorMessages.invalidEmail)
      }

      if (error.code === 'auth/weak-password') {
        throw localized.text(Texts.errorMessages.weakPassword)
      }

      throw localized.text(Texts.genericError)
    })
}

const updateUserProfile = async ({ displayName, photoURL }) => {
  console.log("fb: updateuserprofile")
  let user = auth().currentUser;

  return await user.updateProfile({
    displayName,
    photoURL
  })
    .then(() => null)
    .catch(function (error) {
      throw error.message
    })
}

const sendVerificationEmail = async () => {
  console.log("fb: sendVerificationEmail")
  auth().languageCode = getCurrentLocale().toLowerCase()
  let user = auth().currentUser;

  return await user.sendEmailVerification()
    .then(() => {
      return null;
    })
    .catch(function (error) {
      if (error.code === "auth/too-many-requests") {
        throw localized.text(Texts.errorMessages.tooManyRequestsResend);
      }

      throw localized.text(Texts.genericError)
    });
}

const reloadUser = async () => {
  console.log("fb: reloadUser")
  await auth().currentUser.reload()
    .then((response) => {
      return null;
    })
    .catch(error => {
      throw error.message
    });

  return auth().currentUser
}

const checkIfEmailIsVerified = () => {
  console.log("fb: checkIfEmailIsVerified")
  let user = auth().currentUser;
  return user && user.emailVerified;
}

const signOut = async () => {
  console.log("fb: signOut")
  return await auth().signOut()
    .then(() => null)
    .catch(error => {
      throw localized.text(Texts.genericError)
    })
}

export default {
  signIn,
  createUser,
  signOut,
  sendVerificationEmail,
  reloadUser,
  updateUserProfile,
  checkIfEmailIsVerified
}