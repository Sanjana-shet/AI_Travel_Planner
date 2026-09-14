// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHtAaycJ172pxALr-ltO70WCs_n6Whqkw",
  authDomain: "travelplanner-49a7a.firebaseapp.com",
  projectId: "travelplanner-49a7a",
  storageBucket: "travelplanner-49a7a.appspot.com",
  messagingSenderId: "671300859364",
  appId: "1:671300859364:web:3c58bbeb8cb42354c2c3f1",
  measurementId: "G-2LPLS6FJL2",
};

export const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Firebase Authentication (Google)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
