// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf9yE6hCBeJJsbLsVAQWNe5_GlMal_gXE",
  authDomain: "cozydesk-861ed.firebaseapp.com",
  projectId: "cozydesk-861ed",
  storageBucket: "cozydesk-861ed.appspot.com",
  messagingSenderId: "91848862422",
  appId: "1:91848862422:web:f219e7d61288129f723777",
  measurementId: "G-SNR6C84ZEF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };
