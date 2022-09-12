import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as firebase from "firebase/app";
import "firebase/auth";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import isDev from "./helpers/devDetect";
import "./index.css";
import { store } from "./store";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#b53f3f",
      light: "#ec6f6a",
      dark: "#7f0418",
    },
    secondary: {
      main: "#0099f5",
    },
    background: {
      paper: "#383838",
      default: "#262626",
    },
    error: {
      main: "#ad0000",
    },
    warning: {
      main: "#ffa700",
    },
    info: {
      main: "#21f3dc",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

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

if (isDev()) {
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
} else {
  // xd
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
