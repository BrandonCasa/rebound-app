import * as React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import isDev from "./helpers/devDetect";

function App() {
  const runStartup = () => {
    document.getElementById("video").requestPictureInPicture();
  };

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
      <video id="video" controls src="video.mp4"></video>
      <Button id="pipButton" variant="contained" onClick={() => runStartup()}>
        Enter PiP
      </Button>
    </div>
  );
}

export default App;
