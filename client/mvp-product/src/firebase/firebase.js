import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

// Reuse the app instance during development reloads.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const database = getDatabase(app);