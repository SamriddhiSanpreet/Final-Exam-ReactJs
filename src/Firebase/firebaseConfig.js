import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBxvgheKljJLOYDCp9ucfp-LcOnuGEiS8w",
    authDomain: "final-exam-reactjs.firebaseapp.com",
    projectId: "final-exam-reactjs",
    storageBucket: "final-exam-reactjs.firebasestorage.app",
    messagingSenderId: "63863738505",
    appId: "1:63863738505:web:6179b615161ebab9723658",
    measurementId: "G-CXDMVJQ31Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
