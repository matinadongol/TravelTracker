import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs5LE6dmfCn8xL1GmnB0HFC31Cg2koSds",
  authDomain: "capstoneproject-4ef50.firebaseapp.com",
  projectId: "capstoneproject-4ef50",
  storageBucket: "capstoneproject-4ef50.appspot.com",
  messagingSenderId: "467308620296",
  appId: "1:467308620296:web:fd7b9d99ddf13a6e917fbd",
  measurementId: "G-K9CREN8CFM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)