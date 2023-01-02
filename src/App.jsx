import { Box, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import CustomToolbar from "./components/Toolbar.Custom";
import LandingPage from "./pages/Landing.page";
import ProfilePage from "./pages/Profile.page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContext, AuthProvider, UserContext, UserProvider } from "./helpers/usersContext";
import darkTheme from "./themes/darkTheme";
import React from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Provider } from "react-redux";
import HomePage from "./pages/Home.page";

function App(props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
              <CustomToolbar />
              <Box sx={{ display: "flex", margin: 2, justifyContent: "center", flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile/:id" element={<ProfilePage />} />
                </Routes>
              </Box>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
