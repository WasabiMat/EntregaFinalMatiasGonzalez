
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trabajofinalreactjs.firebaseapp.com",
  projectId: "trabajofinalreactjs",
  storageBucket: "trabajofinalreactjs.appspot.com",
  messagingSenderId: "299897147644",
  appId: "1:299897147644:web:90e06cca43834a9c214779"
};


const app = initializeApp(firebaseConfig);

export const db= getFirestore(app)


