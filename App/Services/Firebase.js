import auth from "@react-native-firebase/auth"
import I18n from "react-native-i18n"
import { TextNames } from "../I18n/languages/Names"

const signIn = async ({ email, password }) => {
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
  auth().languageCode = I18n.currentLocale().substring(0, 2).toLowerCase()
  let user = auth().currentUser;

  return await user.sendEmailVerification()
    .then(() => null)
    .catch(function (error) {
      throw error.message
    });
}

const reloadUser = async () => {
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
  let user = auth().currentUser;
  return user && user.emailVerified;
}

const signOut = async () => {
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