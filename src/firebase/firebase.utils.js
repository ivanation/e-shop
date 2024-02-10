// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
//import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
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
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //console.log(credential);
        //const token = credential.accessToken;
        //console.log(token);
        // The signed-in user info.
        //const user = result.user;
        //console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
    });
}

//////////////// email and pass

export const signUpEmail = (email, password, displayName) => {
    createUserWithEmailAndPassword(fireauth, email, password, displayName)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user.displayName = displayName;
            return user;
            // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
    });
}

export const signInEmail = (email, password) => {
    signInWithEmailAndPassword(fireauth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user;
            // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
    });
}


///////////////// Firebase DB

export const firedb = getFirestore(firebaseApp);

export const createUserProfileDocment = async (userAuth, additionalData) => {
    
    // si no existe userAuth nos regresamos
    if(!userAuth) return;

    // parametros para base de datos buscando user userAuth.uid
    const docRef = doc(firedb, "users", `${userAuth.uid}`);
    const docSnap = await getDoc(docRef);
    
    // si existe imprimo y lo regreso
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    
    // si no existe creo el nuevo usuario en la base de datos
    } else {
        console.log("No such document! Creating...");

        // colleccion
        const dbRef = collection(firedb, "users");

        // variables a salvar
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // salvando
        try{
            const docSnap2 = await setDoc(doc(dbRef, userAuth.uid), {
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
            return (docSnap2);
        } catch (error) {
            console.log('error creating user', error);
        }
    }
}



