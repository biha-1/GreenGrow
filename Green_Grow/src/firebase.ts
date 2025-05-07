import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB90VvLuqft-xI7jUARdGpXEpu37hP7jV8",
  authDomain: "project5-b5d2a.firebaseapp.com",
  projectId: "project5-b5d2a",
  storageBucket: "project5-b5d2a.firebasestorage.app",
  messagingSenderId: "216987540208",
  appId: "1:216987540208:web:b3d76fdbd4b16a3005c035"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);