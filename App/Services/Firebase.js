import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-community/google-signin"
import { Texts, localized, getCurrentLocale } from "../Localization"

GoogleSignin.configure({
  webClientId: '463746538605-j11n338qjttnth36h5q6vujnfqgf1oj8.apps.googleusercontent.com',
});

const googleProviderId = auth.GoogleAuthProvider.PROVIDER_ID;
const emailProviderId = auth.EmailAuthProvider.PROVIDER_ID;

// Signs in with the given email and password
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

// Signs in with Google Popup
const signInWithGoogle = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return await signInWithCredential(googleCredential)
}

// Signs in with the given credentials, ex: Google Credentials for Google Sign-in
const signInWithCredential = async (credential) => {
  console.log("fb: signInWithCredential")
  auth().languageCode = getCurrentLocale().toLowerCase()

  return await auth().signInWithCredential(credential)
    .then(() => null)
    .catch(error => {
      console.log("signinwithcredentail", error)
    })
}

// Create a user with the given email and password
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

// Update the current user's displayName and photoURL
const updateUserProfile = async ({ displayName, photoURL }) => {
  console.log("fb: updateuserprofile")
  let user = auth().currentUser;

  return await user.updateProfile({
    displayName,
    photoURL
  })
    .then(() => null)
    .catch(function (error) {
      throw localized.text(Texts.genericError)
    })
}

// Send a verification email to the current user's email address.
// The email includes a link
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

// Reload the user and return the user object with the reloaded values
const reloadUser = async () => {
  console.log("fb: reloadUser")
  await auth().currentUser.reload()
    .then((response) => {
      return null;
    })
    .catch(error => {
      throw localized.text(Texts.genericError)
    });

  return auth().currentUser
}

// Checks if the current user's email is verified
const checkIfEmailIsVerified = () => {
  console.log("fb: checkIfEmailIsVerified")
  let user = auth().currentUser;
  return user && user.emailVerified;
}

// Send a password reset email to the given email adress.
// The email includes a link.
// When clicked, redirects to a page where the user can enter new password
const sendPasswordResetEmail = async ({ email }) => {

  return await auth().sendPasswordResetEmail(email)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        throw localized.text(Texts.errorMessages.userNotFound)
      }

      throw localized.text(Texts.genericError)
    });
}

// Returns the ID of the providers of the current user, google, password, etc.
const getProviderIds = () => {

  let providerIds = [];

  let user = auth().currentUser;
  user.providerData.forEach(function (profile) {
    providerIds.push(profile.providerId);
  });
  
  return providerIds;
}

// Reauthenticate the current user with google credentials
const reauthenticateWithGoogle = async () => {

  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  await reauthenticate(googleCredential)
}

// Reauthenticate the current user with email and password
const reauthenticateWithEmailPassword = async ({ email, password }) => {

  let emailCredential = auth.EmailAuthProvider.credential(email, password);

  await reauthenticate(emailCredential)
}

// Reauthenticate the current user, with the given credential
const reauthenticate = async (credential) => {
  console.log("fb: reauthenticate")

  let user = auth().currentUser;

  await user.reauthenticateWithCredential(credential)
    .then(() => { })
    .catch((error) => {
      console.log(error.code)
      if (error.code === 'auth/wrong-password') {
        throw localized.text(Texts.errorMessages.wrongPassword)
      }

      throw localized.text(Texts.genericError)
    });
}

// Update the user's password with the given new password
const changePassword = async ({ newPassword }) => {
  var user = auth().currentUser;

  return await user.updatePassword(newPassword)
    .then(() => null)
    .catch(error => {
      if (error.code === 'auth/weak-password') {
        throw localized.text(Texts.errorMessages.weakPassword)
      }

      throw localized.text(Texts.genericError)
    });
}

// Simply signs out the current user
const signOut = async () => {
  console.log("fb: signOut")
  return await auth().signOut()
    .then(() => null)
    .catch(error => {
      throw localized.text(Texts.genericError)
    })
}

// Deletes the current user's account
const deleteAccount = async () => {
  console.log("fb: deleteAccount")
  let user = auth().currentUser;
  return await user.delete()
    .then()
    .catch(error => {
      throw localized.text(Texts.genericError)
    })
}

export default {
  signIn,
  createUser,
  signOut,
  sendVerificationEmail,
  sendPasswordResetEmail,
  reloadUser,
  updateUserProfile,
  checkIfEmailIsVerified,
  changePassword,
  deleteAccount,
  signInWithGoogle,
  getProviderIds,
  reauthenticateWithEmailPassword,
  reauthenticateWithGoogle,
  googleProviderId,
  emailProviderId
}