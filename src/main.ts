import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7dYIHGveQdstzf-I-rcChtWuAR2F4mJQ",
  authDomain: "todolist-ca47f.firebaseapp.com",
  projectId: "todolist-ca47f",
  storageBucket: "todolist-ca47f.appspot.com",
  messagingSenderId: "513293635526",
  appId: "1:513293635526:web:ecfecd02bf0c054dd2ecc7",
  measurementId: "G-SY3TB88CZH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
