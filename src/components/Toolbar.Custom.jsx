import * as IconSvgs from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function ToolbarUserButton(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signInGoogle = (event) => {
    const provider = new GoogleAuthProvider();
    //firebase.login({ provider: "google", type: "popup" });
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    });
  };
  if (user) {
    return (
      <IconButton sx={{ mr: "16px", padding: "0px", height: "32px", width: "32px" }}>
        <IconSvgs.AccountCircle sx={{ fontSize: 24, color: "white" }} />
      </IconButton>
    );
  } else {
    return (
      <Button variant="contained" onClick={(event) => signInGoogle(event)} sx={{ mr: "10px" }}>
        Sign In
      </Button>
    );
  }
}

function CustomToolbar(props) {
  // iconbutton onClick={() => setSettingsDrawerOpen(true)}
  return (
    <React.Fragment>
      <AppBar position="fixed" height="48px">
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h6" component="div" sx={{ ml: "24px", flexGrow: 1 }}>
            Rebound
          </Typography>
          <ToolbarUserButton />
          <IconButton sx={{ mr: "16px", padding: "0px", height: "32px", width: "32px" }}>
            <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" disableGutters />
    </React.Fragment>
  );
}

export default CustomToolbar;
