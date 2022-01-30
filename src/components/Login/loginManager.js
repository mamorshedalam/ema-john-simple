import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export const initializeLoginFramework = () => { initializeApp(firebaseConfig); }


// SIGN IN WITH GOOGLE
export const handleGoogleSignIn = () => {
     const provider = new GoogleAuthProvider();
     const auth = getAuth();
     return signInWithPopup(auth, provider)
          .then((result) => {
               const { displayName, photoURL, email } = result.user;
               const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
               }
               return signedInUser;
          })
          .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               const email = error.email;
               const credential = GoogleAuthProvider.credentialFromError(error);
               console.log('errorCode', errorCode, 'errorMessage', errorMessage, 'errorEmail', email, 'credential', credential);
          });
}

// SIGN OUT
export const handleSignOut = () => {
     const auth = getAuth();
     return signOut(auth).then(() => {
          const signOutUser = {
               isSignedIn: false,
               name: '',
               email: '',
               photo: '',
               success: false,
          }
          return signOutUser;
     })
          .catch((error) => {
               console.log('error', error);
          });
}

// CREATE NEW USER
export const createNewUser = (name, email, password) => {
     const auth = getAuth();
     return createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
               const newUserInfo = result.user;
               newUserInfo.error = '';
               newUserInfo.success = true;
               updateUserName(name);
               return newUserInfo;
          })
          .catch((error) => {
               const newUserInfo = {};
               newUserInfo.error = error.message;
               newUserInfo.success = false;
               return newUserInfo;
          })
}

// FOR UPDATE USER NAME
const updateUserName = name => {
     const auth = getAuth();
     updateProfile(auth.currentUser, {
          displayName: name
     }).then(() => {
          console.log('user name updated successfully');
     }).catch((error) => {
          console.log('error', error);
     });
}

// SING IN WITH EMAIL
export const signInWithEmail = (email, password) => {
     const auth = getAuth();
     return signInWithEmailAndPassword(auth, email, password)
          .then((result) => {
               const newUserInfo = result.user;
               newUserInfo.error = '';
               newUserInfo.success = true;
               return newUserInfo;
          })
          .catch((error) => {
               const newUserInfo = {};
               newUserInfo.error = error.message;
               newUserInfo.success = false;
               return newUserInfo;
          });
}