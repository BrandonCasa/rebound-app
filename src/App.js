// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Avatar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsDrawer from "routes/Common/SettingsDrawer";
import LandingPage from "routes/Landing/Landing";

function App() {
  // Function State
  const [currentUser, setCurrentUser] = React.useState({});
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
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
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <ThemeProvider theme={{ ...themeActual }}>
        <div style={{ width: "100%", height: "100%", backgroundColor: themeActual.palette.background.default, overflow: "hidden" }}>
          <BrowserRouter>
            <AppBar position="static">
              <Toolbar variant="dense" disableGutters>
                <IconButton edge="start" color="inherit" sx={{ ml: "12px", mr: "12px", padding: "6px" }}>
                  <MenuIcon />
                </IconButton>
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
                  <IconSvgs.Settings sx={{ fontSize: 24 }} />
                </IconButton>
              </Toolbar>
            </AppBar>
            <SettingsDrawer setCurrentUser={setCurrentUser} setSettingsDrawerOpen={setSettingsDrawerOpen} settingsDrawerOpen={settingsDrawerOpen} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
