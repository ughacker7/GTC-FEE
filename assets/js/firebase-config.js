import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDJnlr-VJt3OqvGeCRIzNCUjhLndpvyoQ",
    authDomain: "gtc-fee-portal.firebaseapp.com",
    databaseURL: "https://gtc-fee-portal-default-rtdb.firebaseio.com",
    projectId: "gtc-fee-portal",
    storageBucket: "gtc-fee-portal.firebasestorage.app",
    messagingSenderId: "861357054407",
    appId: "1:861357054407:web:8d1c8a5dce4c3969c361e2",
    measurementId: "G-SJWZFVM3YQ"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);