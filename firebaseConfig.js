import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArULFrn4LlGVsOozGLEu03DWFaSmj2alQ",
  authDomain: "next-chat-app-2af48.firebaseapp.com",
  projectId: "next-chat-app-2af48",
  storageBucket: "next-chat-app-2af48.appspot.com",
  messagingSenderId: "50556063310",
  appId: "1:50556063310:web:8b7611e1a9233fcde87d1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
