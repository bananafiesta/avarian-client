import {FirebaseApp, initializeApp} from "firebase/app";
import {Auth, getAuth, GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAithnWX3pYhwMRotBs_tZR_wB4qvZe50M",
    authDomain: "avarian-login.firebaseapp.com",
    projectId: "avarian-login",
    storageBucket: "avarian-login.appspot.com",
    messagingSenderId: "383134661578",
    appId: "1:383134661578:web:72080660fdabca0554ad33",
    measurementId: "G-FM4NFGK1MC"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth: Auth = getAuth(app);
export const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
export const emailAuthProvider: EmailAuthProvider = new EmailAuthProvider();
