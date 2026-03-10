import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace this with your actual Firebase Configuration
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project
// 3. Add a Web App to the project and copy the config below
// 4. Go to Authentication -> Sign-in method -> Enable "Google"
const firebaseConfig = {
  apiKey: "AIzaSyDUAjZPqvrgo8-NtS4jn48rHzi4sprZQJg",
  authDomain: "ff-esport-8aeb4.firebaseapp.com",
  projectId: "ff-esport-8aeb4",
  storageBucket: "ff-esport-8aeb4.firebasestorage.app",
  messagingSenderId: "156690767316",
  appId: "1:156690767316:web:1adf073bad326383778a41",
  measurementId: "G-4MQFL48530",
  // Realtime Database URL might be required for some projects
  databaseURL: "https://ff-esport-8aeb4-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Realtime Database
export const rtdb = getDatabase(app);

export const analytics = getAnalytics(app);

