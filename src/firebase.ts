// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgmZ8H1lzHaT_Fp2oBn6ZAhWi6zMQrLcM",
  authDomain: "project5-c81b8.firebaseapp.com",
  projectId: "project5-c81b8",
  storageBucket: "project5-c81b8.firebasestorage.app",
  messagingSenderId: "222511556333",
  appId: "1:222511556333:web:f21e1f567e0ad1c3744ee4",
  measurementId: "G-FBC89CTYS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
