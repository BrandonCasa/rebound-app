import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, compose } from "redux";
import { firestoreReducer, reduxFirestore } from "redux-firestore";
import store from "./store.new";

const firebaseConfig = {
  apiKey: "AIzaSyCuaPnICOw47KhFAe8VMV-tlGSRVJdSWO0",
  authDomain: "rebound-380d6.firebaseapp.com",
  projectId: "rebound-380d6",
  storageBucket: "rebound-380d6.appspot.com",
  messagingSenderId: "684756945046",
  appId: "1:684756945046:web:9a6d74827ac6a678a55ab7",
  measurementId: "G-KN4SQMP7Q3",
};
const rfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();

render(
  <Provider store={store}>
    <h1>xd</h1>
  </Provider>,
  document.getElementById("root")
);
