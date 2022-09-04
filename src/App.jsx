import * as IconSvgs from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import AccountButton from "./components/AccountButton";

function App(props) {
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

  // iconbutton onClick={() => setSettingsDrawerOpen(true)}
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <AppBar position="fixed" height="48px">
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h6" component="div" sx={{ ml: "24px", flexGrow: 1 }}>
            Rebound
          </Typography>
          <AccountButton />
          <IconButton sx={{ mr: "24px", padding: "0px" }}>
            <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" disableGutters />
      <Box sx={{ margin: "12px", flexGrow: 1, height: "100%" }}>
        <Routes>
          <Route exact path="/" element={<div>xd</div>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
