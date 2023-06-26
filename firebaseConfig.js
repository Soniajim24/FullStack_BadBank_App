//import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
//import 'firebase/compat/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkGKbPgKdxpPqP37GyxKXh4hWmWs7L9dE",
    authDomain: "badbank-eb5fc.firebaseapp.com",
    projectId: "badbank-eb5fc",
    storageBucket: "badbank-eb5fc.appspot.com",
    messagingSenderId: "351104453657",
    appId: "1:351104453657:web:b5eb8fe4594c28b1152e88"
};

// Initialize Firebase
//if (!firebase.apps.length) {
 // firebase.initializeApp(firebaseConfig);
//}

// Export the auth module
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

