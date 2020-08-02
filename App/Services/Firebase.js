import auth from "@react-native-firebase/auth"
import I18n from "react-native-i18n"
import { TextNames } from "../I18n/languages/Names"

const signIn = async ({ email, password }) => {
  console.log("fb: signin")
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        throw I18n.t(TextNames.errorMessages.invalidEmail)
      }

      if (error.code === 'auth/user-not-found') {
        throw I18n.t(TextNames.errorMessages.userNotFound)
      }

      if (error.code === 'auth/wrong-password') {
        throw I18n.t(TextNames.errorMessages.wrongPassword)
      }

      throw I18n.t(TextNames.genericError)
    })
}

const createUser = async ({ email, password }) => {
  console.log("fb: createUser")
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        throw I18n.t(TextNames.errorMessages.emailAddressAlreadyInUse)
      }

      if (error.code === 'auth/invalid-email') {
        throw I18n.t(TextNames.errorMessages.invalidEmail)
      }

      if (error.code === 'auth/weak-password') {
        throw I18n.t(TextNames.errorMessages.weakPassword)
      }

      throw I18n.t(TextNames.genericError)
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
  auth().languageCode = I18n.currentLocale().substring(0, 2).toLowerCase()
  let user = auth().currentUser;

  return await user.sendEmailVerification()
    .then(() => {
      return null;
    })
    .catch(function (error) {
      if (error.code === "auth/too-many-requests") {
        throw "We have just sent the e-mail. Please either check your spam box or check if you have provided the correc e-mail address.";
      }

      throw I18n.t(TextNames.genericError)
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
      throw I18n.t(TextNames.genericError)
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