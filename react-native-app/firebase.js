// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC8AyHDTY8r1B6RgZ6Ia-znE8fHqRFNwY",
  authDomain: "mobile-hangman-b1673.firebaseapp.com",
  projectId: "mobile-hangman-b1673",
  storageBucket: "mobile-hangman-b1673.appspot.com",
  messagingSenderId: "451122214065",
  appId: "1:451122214065:web:4b51d624e58d25ba0fde90",
  measurementId: "G-1B9X01GLEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
