import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyATzxX58HFzStxRgQJjfFEuXaFQaji3eXk",
  authDomain: "blogging-app-40e20.firebaseapp.com",
  projectId: "blogging-app-40e20",
  storageBucket: "blogging-app-40e20.firebasestorage.app",
  messagingSenderId: "722987078688",
  appId: "1:722987078688:web:a28e5a00a020e2847e1845",
  measurementId: "G-79Z1VPW074"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);