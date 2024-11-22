import { initializeApp } from "firebase/app";
// import { get, getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzZMKaXesr3Ft4-Qy_g5MmTpvLgVLmpTA",
  authDomain: "productivity-fa91c.firebaseapp.com",
  projectId: "productivity-fa91c",
  storageBucket: "productivity-fa91c.firebasestorage.app",
  messagingSenderId: "676224644178",
  appId: "1:676224644178:web:55d319c505fa1728bd5b8b",
  measurementId: "G-XRZXJM2BGD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// import firebase from 'firebase/app';
// import 'firebase/firestore'; // If you're using Firestore to store heatmap data
// import { getAuth } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyBzZMKaXesr3Ft4-Qy_g5MmTpvLgVLmpTA",
//   authDomain: "productivity-fa91c.firebaseapp.com",
//   projectId: "productivity-fa91c",
//   storageBucket: "productivity-fa91c.firebasestorage.app",
//   messagingSenderId: "676224644178",
//   appId: "1:676224644178:web:55d319c505fa1728bd5b8b",
//   measurementId: "G-XRZXJM2BGD"
// };

// // Initialize Firebase
// // if (!firebase.apps.length) {
// //   firebase.initializeApp(firebaseConfig);
// // } else {
// //   firebase.app(); // Use the default app if it's already initialized
// // }

// const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export {app, auth};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBzZMKaXesr3Ft4-Qy_g5MmTpvLgVLmpTA",
//   authDomain: "productivity-fa91c.firebaseapp.com",
//   projectId: "productivity-fa91c",
//   storageBucket: "productivity-fa91c.firebasestorage.app",
//   messagingSenderId: "676224644178",
//   appId: "1:676224644178:web:55d319c505fa1728bd5b8b",
//   measurementId: "G-XRZXJM2BGD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

