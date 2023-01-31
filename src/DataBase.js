// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6bJqhWJWwoos-qQaFVLXVoFLlItaC3k4",
  authDomain: "gestor-faltantes.firebaseapp.com",
  projectId: "gestor-faltantes",
  storageBucket: "gestor-faltantes.appspot.com",
  messagingSenderId: "59198160074",
  appId: "1:59198160074:web:321bfd715e3ca3abfd8833",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const addMissings = async (missing, pharmacy) => {
  try {
    const docRef = await addDoc(collection(db, pharmacy), missing);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readMissings = async (pharmacy) => {
  let ArrayMissings = [];
  const querySnapshot = await getDocs(collection(db, pharmacy));
  querySnapshot.forEach((doc) => {
    ArrayMissings.push(doc.data());
  });

  return ArrayMissings;
};

export const updateStateMissings = async (pharmacy, id, state) => {
  const q = query(collection(db, pharmacy), where("id", "==", id));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((element) => {
    updateDoc(doc(db, pharmacy, element.id), {
      complete: !state,
    });
  });
};

export const deleteMissing = async (pharmacy, id) => {
  const q = query(collection(db, pharmacy), where("id", "==", id));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((element) => {
    deleteDoc(doc(db, pharmacy, element.id));
  });
};
