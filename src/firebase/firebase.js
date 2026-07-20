import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyYF_YlCfR2Lkg3RVKRg3vTjGMjN2phok",
  authDomain: "rentcar-b985b.firebaseapp.com",
  projectId: "rentcar-b985b",
  storageBucket: "rentcar-b985b.firebasestorage.app",
  messagingSenderId: "711505532071",
  appId: "1:711505532071:web:6c8c967de708568c4eb782",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);