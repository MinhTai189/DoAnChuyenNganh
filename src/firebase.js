import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCVhODuJBrpuGEkApf9f98LVZeIL9A2I78",
    authDomain: "doanchuyennganh-088.firebaseapp.com",
    projectId: "doanchuyennganh-088",
    storageBucket: "doanchuyennganh-088.appspot.com",
    messagingSenderId: "766382499192",
    appId: "1:766382499192:web:f39054888229c7f6c8d48d"
};

firebase.initializeApp(firebaseConfig);

export const firebaseStore = firebase.firestore()
export const firebaseAuth = firebase.auth();
export const providerGG = new firebase.auth.GoogleAuthProvider();
export const providerFB = new firebase.auth.FacebookAuthProvider();
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const fieldValue = firebase.firestore.FieldValue;
