import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBXF9B1a6Q-_st51CCi71TQVzXsRPTwQLY",
    authDomain: "doan-088.firebaseapp.com",
    projectId: "doan-088",
    storageBucket: "doan-088.appspot.com",
    messagingSenderId: "865287238755",
    appId: "1:865287238755:web:d9ae1e6ad7e60b50e13456"
};

firebase.initializeApp(firebaseConfig);

export const firebaseStore = firebase.firestore()
export const firebaseAuth = firebase.auth();
export const providerGG = new firebase.auth.GoogleAuthProvider();
export const providerFB = new firebase.auth.FacebookAuthProvider();
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const fieldValue = firebase.firestore.FieldValue;
