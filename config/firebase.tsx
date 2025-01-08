// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdIYlli4xSVtDOKFCcX32HsR6yMhec3eI",
    authDomain: "prueba1-afcc2.firebaseapp.com",
    projectId: "prueba1-afcc2",
    storageBucket: "prueba1-afcc2.firebasestorage.app",
    messagingSenderId: "853410587394",
    appId: "1:853410587394:web:5383a4244213f27789581b",
    measurementId: "G-29L6LCE74R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);