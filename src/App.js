import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function App() {
  const runStartup = () => {
    document.getElementById("video").requestPictureInPicture();
  };

  return (
    <div>
      <video id="video" controls src="video.mp4"></video>
      <Button id="pipButton" variant="contained" onClick={() => runStartup()}>
        Enter PiP
      </Button>
    </div>
  );
}

export default App;
