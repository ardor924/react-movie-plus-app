// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_8M23At-ZytPX6JrbW3pNg9pyr6EtEdM",
  authDomain: "react-disney-plus-app-fb0f8.firebaseapp.com",
  projectId: "react-disney-plus-app-fb0f8",
  storageBucket: "react-disney-plus-app-fb0f8.appspot.com",
  messagingSenderId: "27538004148",
  appId: "1:27538004148:web:985583d59e9513f18cdfe1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;