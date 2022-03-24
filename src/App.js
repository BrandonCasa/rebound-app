import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import getDesignTokens from "helpers/designTokens";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "routes/Landing/Landing";
import isDev from "./helpers/devDetect";

function App() {
  // Function State
  const [currentUser, setCurrentUser] = React.useState(null);
  const [mode, setMode] = React.useState("dark");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <ThemeProvider theme={theme}>
        <div style={{ width: "100%", height: "100%", backgroundColor: theme.palette.background.default, overflow: "hidden" }}>
          <BrowserRouter>
            <AppBar position="static">
              <Toolbar variant="dense">
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Rebound
                </Typography>
                {currentUser ? (
                  <Typography variant="h6" component="div">
                    {currentUser.uid}
                  </Typography>
                ) : (
                  <Button color="inherit" onClick={signInDev}>
                    Login
                  </Button>
                )}
              </Toolbar>
            </AppBar>
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
