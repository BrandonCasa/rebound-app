import * as firebase from "firebase/app";
import "firebase/auth";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import isDev from "./helpers/devDetect";
import "./index.css";
import { store } from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyCuaPnICOw47KhFAe8VMV-tlGSRVJdSWO0",
  authDomain: "rebound-380d6.firebaseapp.com",
  projectId: "rebound-380d6",
  storageBucket: "rebound-380d6.appspot.com",
  messagingSenderId: "684756945046",
  appId: "1:684756945046:web:9a6d74827ac6a678a55ab7",
  measurementId: "G-KN4SQMP7Q3",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);
functions.region = "us-central1";
const storage = getStorage(app);
const firestore = getFirestore(app);

if (isDev()) {
  connectFirestoreEmulator(firestore, "localhost", 8181);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
} else {
  // xd
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
