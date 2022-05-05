// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { AppBar, Avatar, Button, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageDrawer from "routes/Common/PageDrawer";
import SettingsDrawer from "routes/Common/SettingsDrawer";
import LandingPage from "routes/Landing/Landing";

function App() {
  // Function State
  const [currentUser, setCurrentUser] = React.useState({});
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const [pageDrawerOpen, setPageDrawerOpen] = React.useState(false);
  const themeActual = useSelector((state) => state.theme.actualTheme);

  // Function Methods
  const signIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const signOut = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  // Function Hooks
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={{ ...themeActual }}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="fixed" height="48px" sx={{ backgroundColor: themeActual.palette.primary.dark, backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))" }}>
          <Toolbar variant="dense" disableGutters>
            <div style={{ width: "72px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rebound
            </Typography>
            {currentUser ? (
              <Avatar
                alt="Remy Sharp"
                src="/images/Avatar1.jpg"
                sx={{ width: 38, height: 38 }}
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <Button variant="contained" onClick={signIn}>
                Sign In
              </Button>
            )}
            <IconButton onClick={() => setSettingsDrawerOpen(true)} sx={{ mr: "12px", ml: "12px", padding: "6px" }}>
              <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" disableGutters />
        <PageDrawer setPageDrawerOpen={setPageDrawerOpen} pageDrawerOpen={pageDrawerOpen} />
        <SettingsDrawer setSettingsDrawerOpen={setSettingsDrawerOpen} settingsDrawerOpen={settingsDrawerOpen} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
