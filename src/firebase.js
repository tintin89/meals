import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "sameals.firebaseapp.com",
    projectId: "sameals",
    storageBucket: "sameals.appspot.com",
    messagingSenderId: "1060624056536",
    appId: "1:1060624056536:web:f898cbbe4dff6c714e97ad",
    measurementId: "G-M992NXG3HY"
  };

 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
    
  const database = firebaseApp.firestore();
  const firebaseAuth=firebaseApp.auth();
  const firebaseF = firebaseApp.functions();
  const storage=firebaseApp.storage();
 

export {storage,firebaseF,firebaseAuth,database as default}