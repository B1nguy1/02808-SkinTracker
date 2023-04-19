import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Setup of firebase database
const firebaseConfig = {
    apiKey: "AIzaSyDRtj4kIOC5Q2XhTtBVRyujgwvlhxf9pZU",
    authDomain: "project-df8fa.firebaseapp.com",
    projectId: "project-df8fa",
    storageBucket: "project-df8fa.appspot.com",
    messagingSenderId: "760396248747",
    appId: "1:760396248747:web:836ac40529b3eef401e9ee",
    measurementId: "G-T06QL6J5L5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
