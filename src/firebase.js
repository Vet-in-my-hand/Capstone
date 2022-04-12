// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA904BPJW3gStaPtfdQdtUFMniR8y6BO_A",
  authDomain: "vet-in-my-hand.firebaseapp.com",
  projectId: "vet-in-my-hand",
  storageBucket: "vet-in-my-hand.appspot.com",
  messagingSenderId: "962258377157",
  appId: "1:962258377157:web:a60e74c347aefa909a13ac",
  measurementId: "G-R9RPEGF6XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;