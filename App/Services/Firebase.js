import auth from "@react-native-firebase/auth"
import I18n from "react-native-i18n"
import { TextNames } from "../I18n/languages/Names"

const signIn = async ({ email, password }) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
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

const sendLink = async ({ email }) => {
  let actionCodeSettings = {
    url: 'https://bemagine-1c194.firebaseapp.com',
    // This must be true.
    handleCodeInApp: true,
    dynamicLinkDomain: 'bemagine.page.link'
  }
    return await auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(response => {
        debugger;
        console.log(response)
        return;
      })
      .catch(error => {
        debugger;
        console.log(error.code, error.message)
        throw error.message
      })
}

const createUser = async ({ email, password }) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
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

const signOut = async () => {
  await auth().signOut()
    .catch(error => {
      throw I18n.t(TextNames.genericError)
    })
}

export default {
  signIn,
  createUser,
  signOut,
  sendLink
}