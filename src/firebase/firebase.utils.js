// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getStorage } from "firebase/storage";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWFYiXg_ryX4O_ohhgetRHvN7oU5h8NAk",
  authDomain: "e-shop-18896.firebaseapp.com",
  projectId: "e-shop-18896",
  storageBucket: "e-shop-18896.appspot.com",
  messagingSenderId: "73110428388",
  appId: "1:73110428388:web:026383a49575cc73966af1",
  measurementId: "G-VCCEKD96VT"
};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);
//const fireanalytics = getAnalytics(firebaseApp );
//const firestorage = getStorage(firebaseApp);


////////////// google sign in

const provider = new GoogleAuthProvider();
export const fireauth = getAuth(firebaseApp );

export const signInWithGoogle = () => {
    signInWithPopup(fireauth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}