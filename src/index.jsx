import * as firebase from "firebase/app";
import "firebase/auth";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
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
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

if (isDev()) {
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
} else {
  // xd
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App darkTheme={darkTheme} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
