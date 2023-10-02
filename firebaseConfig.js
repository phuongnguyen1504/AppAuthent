import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDXka1HSONJwciKnTD4oVocn6fc_bSZpQs",
    authDomain: "reactnative-20f7a.firebaseapp.com",
    projectId: "reactnative-20f7a",
    storageBucket: "reactnative-20f7a.appspot.com",
    messagingSenderId: "465998186220",
    appId: "1:465998186220:web:4ef132b6f6de57fd3007c9",
    measurementId: "G-D4Q0MWWLDL"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

// const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// web: 236608320310-1eedrrjia5i01dv75409hvg9esqptiqr.apps.googleusercontent.com
//ios: 236608320310-2q1h96m2celsha3j45hm0vpibkr1jvjc.apps.googleusercontent.com
// Android: 236608320310-vsmae1aqtrcmqt3tojll14ak4oh6nnkr.apps.googleusercontent.com
// kollfgn2avc0up0piihjcrrh2vlv9uea