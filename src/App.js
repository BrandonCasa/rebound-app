import * as React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { app, analytics, db, auth } from "./server/index";

function App() {
  const runStartup = () => {
    document.getElementById("video").requestPictureInPicture();
  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
