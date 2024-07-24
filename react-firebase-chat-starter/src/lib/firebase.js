
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-c2361.firebaseapp.com",
  projectId: "chat-app-c2361",
  storageBucket: "chat-app-c2361.appspot.com",
  messagingSenderId: "407884392421",
  appId: "1:407884392421:web:0cbf8df08b560bef6d310c",
  measurementId: "G-YQYYVZERQW"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()