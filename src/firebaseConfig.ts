// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ7VkF3JQ9hvef4JKwT0apWcPehcO7Rnk",
  authDomain: "tenants-3cef1.firebaseapp.com",
  projectId: "tenants-3cef1",
  storageBucket: "tenants-3cef1.appspot.com",
  messagingSenderId: "104683298089",
  appId: "1:104683298089:web:c604ce8675c4efac22eb38"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;