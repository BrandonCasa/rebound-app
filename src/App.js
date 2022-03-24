import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "routes/Landing/Landing";
import isDev from "./helpers/devDetect";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const signInDev = () => {
    if (isDev()) {
      const config = require("./dev_config/config.js");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, config.email, config.password);
    }
  };

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
    <div>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
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
  );
}

export default App;
