import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, query, where, getDocs, limit, Timestamp, serverTimestamp} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnb_A0RqbX0IGklpk1B_q0NbHSxLSSWk4",
    authDomain: "todoweb-42f28.firebaseapp.com",
    projectId: "todoweb-42f28",
    storageBucket: "todoweb-42f28.appspot.com",
    messagingSenderId: "761000317963",
    appId: "1:761000317963:web:7f2536169c4699a490630e",
    measurementId: "G-526KRW6RKF"
  };
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase
  export const auth = getAuth(app);
  export const googleAuthProvider = new GoogleAuthProvider();
  export const db = getFirestore(app);
  export const storage = getStorage(app);
  export const fromMillis = Timestamp.fromMillis;
  const timestamp = serverTimestamp();