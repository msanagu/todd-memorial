import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBO8vePFzhZ_h7K-Lj8D1nm1yTKG_cqck",
  authDomain: "todd-memorial.firebaseapp.com",
  projectId: "todd-memorial",
  storageBucket: "todd-memorial.firebasestorage.app",
  messagingSenderId: "975984622762",
  appId: "1:975984622762:web:8bb8922ef64609efe864d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
