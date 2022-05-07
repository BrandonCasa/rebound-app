// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { AppBar, Avatar, Button, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageDrawer from "routes/Common/PageDrawer";
import SettingsDrawer from "routes/Common/SettingsDrawer";
import LandingPage from "routes/Landing/Landing";
import { flushActualServers, setActualServer, setMyServers } from "./redux/Firestuff/firestuff.slice";
import CreateServerDialog from "./routes/Dialogs/CreateServerDialog";
import { auth, db } from "./server/index";

function App(props) {
  const dispatch = useDispatch();

  // Function State
  const [currentUser, setCurrentUser] = React.useState({});
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const [pageDrawerOpen, setPageDrawerOpen] = React.useState(false);
  const [createServerDialogOpen, setCreateServerDialogOpen] = React.useState(false);
  const themeActual = useSelector((state) => state.theme.actualTheme);
  const [listenedServers, setListenedServers] = React.useState([]);

  // Function Methods
  const signIn = (event) => {
    //event.preventDefault();
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        // Listen to User
        onSnapshot(doc(db, "users", auth.currentUser.uid), async (userSnap) => {
          if (userSnap.data() && userSnap.data().servers) {
            for (const serverId of userSnap.data().servers) {
              const serverSnap = await getDoc(doc(db, "servers", serverId));
              dispatch(setActualServer({ serverId: serverId, serverData: serverSnap.data().serverData }));
            }

            dispatch(setMyServers(userSnap.data().servers));
          }
          //console.log("Current data: ", doc.data());
        });
      } else {
        setCurrentUser(null);
        dispatch(setMyServers([]));
        dispatch(flushActualServers());
      }
    });
  }, []);

  return (
    <ThemeProvider theme={{ ...themeActual }}>
      <CssBaseline />
      <BrowserRouter>
        <CreateServerDialog createServerDialogOpen={createServerDialogOpen} setCreateServerDialogOpen={setCreateServerDialogOpen} />
        <AppBar position="fixed" height="48px" sx={{ backgroundColor: themeActual.palette.primary.dark, backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))" }}>
          <Toolbar variant="dense" disableGutters>
            <div style={{ width: "72px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rebound
            </Typography>
            {currentUser ? (
              <Avatar
                alt="Among Us"
                src="/images/Avatar1.jpg"
                sx={{ width: 38, height: 38 }}
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <Button variant="contained" onClick={(event) => signIn(event)}>
                Sign In
              </Button>
            )}
            <IconButton onClick={() => setSettingsDrawerOpen(true)} sx={{ mr: "12px", ml: "12px", padding: "6px" }}>
              <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" disableGutters />
        <PageDrawer setPageDrawerOpen={setPageDrawerOpen} pageDrawerOpen={pageDrawerOpen} setCreateServerDialogOpen={setCreateServerDialogOpen} />
        <SettingsDrawer setSettingsDrawerOpen={setSettingsDrawerOpen} settingsDrawerOpen={settingsDrawerOpen} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
