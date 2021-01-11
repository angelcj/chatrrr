import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQmyqnT1_NiCaWDezeqRwbxqoH_ic0SYo",
  authDomain: "chatrrr-c598a.firebaseapp.com",
  projectId: "chatrrr-c598a",
  storageBucket: "chatrrr-c598a.appspot.com",
  messagingSenderId: "307047467054",
  appId: "1:307047467054:web:9fc7e2b09d37050e4bb7bf"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
