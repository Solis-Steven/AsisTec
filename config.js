import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDs2ReP6RzEPfA7KJjib5_HrzZ89KMczmQ",
    authDomain: "asistec-e6dcc.firebaseapp.com",
    projectId: "asistec-e6dcc",
    storageBucket: "asistec-e6dcc.appspot.com",
    messagingSenderId: "824417213845",
    appId: "1:824417213845:web:89600ea44c48f5a4cd6a9c",
    measurementId: "G-KYJYYWJ881"
}

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };