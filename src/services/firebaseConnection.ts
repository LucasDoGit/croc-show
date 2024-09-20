import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDocaUkvwV7c-l2O6ipT8TU8KUcXLuqFBg",
  authDomain: "croc-show.firebaseapp.com",
  projectId: "croc-show",
  storageBucket: "croc-show.appspot.com",
  messagingSenderId: "972794058173",
  appId: "1:972794058173:web:861a145ef1d80a54afaed4",
  measurementId: "G-4SNWQ0YFYH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

const analytics = getAnalytics(app);

export { db, auth, storage };