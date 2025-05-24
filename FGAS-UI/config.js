// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC72bcXdymVnQ1qZQkVTknYqo746wyXj_A",
  authDomain: "goverment-farmer-aided-schemes.firebaseapp.com",
  projectId: "goverment-farmer-aided-schemes",
  storageBucket: "goverment-farmer-aided-schemes.firebasestorage.app",
  messagingSenderId: "186798660864",
  appId: "1:186798660864:web:51315c458c1aea792327e5",
  measurementId: "G-V173Q944MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth,db};

