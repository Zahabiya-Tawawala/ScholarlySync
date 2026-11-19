// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApQPoYGseUDwkyXQhOPZKl59YadjksTTM",
  authDomain: "scholarly-sync-database.firebaseapp.com",
  databaseURL: "https://scholarly-sync-database-default-rtdb.firebaseio.com",
  projectId: "scholarly-sync-database",
  storageBucket: "scholarly-sync-database.firebasestorage.app",
  messagingSenderId: "242879245450",
  appId: "1:242879245450:web:6d95b92d2016dfa9871173",
  measurementId: "G-J34EEYXNP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);