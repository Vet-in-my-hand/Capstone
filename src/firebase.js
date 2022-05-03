import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA904BPJW3gStaPtfdQdtUFMniR8y6BO_A",
  authDomain: "vet-in-my-hand.firebaseapp.com",
  projectId: "vet-in-my-hand",
  storageBucket: "vet-in-my-hand.appspot.com",
  messagingSenderId: "962258377157",
  appId: "1:962258377157:web:a60e74c347aefa909a13ac",
  measurementId: "G-R9RPEGF6XL"
}

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();