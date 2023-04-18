// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyD44qmaELaC1pCt4qdaVffhr2gbJhmNAYg',
  authDomain: '',
  databaseURL:
    'https://project3-d568a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'project3-d568a',
  storageBucket: '',
  messagingSenderId: '',
  appId: '1:925160042592:android:69b1360e279fc00f025305',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
// export default app;
