import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDmoYUOwQEyaoC3l-ZwvcZKkODo4PcTW48",
    authDomain: "doanchuyennganh-189.firebaseapp.com",
    projectId: "doanchuyennganh-189",
    storageBucket: "doanchuyennganh-189.appspot.com",
    messagingSenderId: "184984455499",
    appId: "1:184984455499:web:32eaf542f744ecb29680ce"
};

firebase.initializeApp(firebaseConfig);

export const firebaseStore = firebase.firestore()
export const firebaseAuth = firebase.auth();
export const providerGG = new firebase.auth.GoogleAuthProvider();
export const providerFB = new firebase.auth.FacebookAuthProvider();
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const fieldValue = firebase.firestore.FieldValue;
