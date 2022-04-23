// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsDrawer from "routes/Common/SettingsDrawer";
import LandingPage from "routes/Landing/Landing";
import isDev from "./helpers/devDetect";

function App() {
  // Function State
  const [currentUser, setCurrentUser] = React.useState({});
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const themeActual = useSelector((state) => state.theme.actualTheme);

  // Function Methods
  const signInDev = () => {
    if (isDev()) {
      const config = require("./dev_config/config.js");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, config.email, config.password);
    }
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
                  <Typography variant="h6" component="div">
                    {
                      // @ts-ignore
                      currentUser.uid
                    }
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={signInDev}>
                    Login
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
