import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2OM78ofD4shaXdnES4fI-M6_KORwXMD0",
  authDomain: "signalclone-90271.firebaseapp.com",
  projectId: "signalclone-90271",
  storageBucket: "signalclone-90271.appspot.com",
  messagingSenderId: "893016654154",
  appId: "1:893016654154:web:4eb6e28767e06abf3701b3",
  measurementId: "G-912HTF0CJR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export  { db,auth };