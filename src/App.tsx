// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { AppBar, Avatar, Button, CssBaseline, IconButton, Stack, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CreateServerDialog from "./components/CreateServerDialog";
import JoinServerDialog from "./components/JoinServerDialog";
import PageDrawer from "./components/PageDrawer";
import ServerDialog from "./components/ServerDialog";
import SettingsDrawer from "./components/SettingsDrawer";
import StatusBadge from "./components/StatusBadge";
import HubPage from "./pages/Hub.page";
import LandingPage from "./pages/Landing.page";
import ServerPage from "./pages/Server.page";
import { flushActualServers, removeOldServers, setActualServer } from "./redux/Firestuff/firestuff.slice";
import { useAppDispatch } from "./redux/store";
import { themeSelector } from "./redux/Theme/theme.slice";
import { auth, db } from "./server/index";
import UserDropMenu from "./components/UserDropMenu";
import { openMenu, closeMenu } from "./redux/DropMenu/dropMenu.slice";
import UserAvatar from "./components/UserAvatar";
import ProfilePage from "./pages/Profile.page";
import ChangeBioDialog from "./components/ChangeBioDialog";
import { setBio } from "./redux/Userstuff/userstuff.slice";

function App(props: any) {
  const themeState = useSelector(themeSelector);
  const dispatch = useAppDispatch();

  // Function State
  const [currentUser, setCurrentUser] = React.useState({});
  const [initializing, setInitializing] = React.useState(true);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);

  // Function Methods
  const signInPopup = (event) => {
    //event.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider).catch((error) => console.error(error.code, error.message));
  };

  const onAuthStateChangedFunc = (user) => {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  };

  // Function Hooks
  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, onAuthStateChangedFunc);
    return () => {
      unsubscribeAuth();
      console.log("Auth Listener Stopped.");
    };
  }, []);

  React.useEffect(() => {
    let serverSubscriptions = {};

    // If logged in
    if (currentUser && currentUser.hasOwnProperty("uid")) {
      // Subscribe to the user
      const unsubscribeUser = onSnapshot(doc(db, "users", currentUser.uid), async (userSnapshot) => {
        if (userSnapshot.data() && userSnapshot.data().servers) {
          // Loop through servers
          for (const serverId of userSnapshot.data().servers) {
            // Subscribe to the server
            const unsubscribeServer = onSnapshot(doc(db, "servers", serverId), async (serverSnapshot) => {
              if (serverSnapshot.data() && serverSnapshot.data().serverData) {
                dispatch(setActualServer({ serverId: serverId, serverData: serverSnapshot.data().serverData }));
              }
            });
            serverSubscriptions[serverId] = unsubscribeServer;
          }
          dispatch(removeOldServers({ new: userSnapshot.data().servers, subs: serverSubscriptions }));
        }
        if (userSnapshot.data() && userSnapshot.data().bio) {
          dispatch(setBio(userSnapshot.data().bio));
        }
      });

      return () => {
        for (const unsubServer in serverSubscriptions) {
          serverSubscriptions[unsubServer]();
        }
        console.log(`${Object.keys(serverSubscriptions).length} Server Listeners Stopped.`);
        dispatch(flushActualServers());
        unsubscribeUser();
        console.log("User Listener Stopped.");
        console.log("Server List Cleared.");
      };
    } else {
      return () => {};
    }
  }, [currentUser]);

  if (initializing) return null;

  return (
    <ThemeProvider theme={{ ...themeState.themeObject }}>
      <CssBaseline />
      <BrowserRouter>
        <CreateServerDialog />
        <JoinServerDialog />
        <ServerDialog />
        <ChangeBioDialog />
        <AppBar
          position="fixed"
          height="48px"
          sx={{ backgroundColor: themeState.themeObject.palette.primary.dark, backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))" }}
        >
          <Toolbar variant="dense" disableGutters>
            <div style={{ width: "77px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rebound
            </Typography>
            {currentUser ? (
              <UserAvatar />
            ) : (
              <Button variant="contained" onClick={(event) => signInPopup(event)} sx={{ mr: "10px" }}>
                Sign In
              </Button>
            )}
            <IconButton onClick={() => setSettingsDrawerOpen(true)} sx={{ mr: "10px", padding: "6px" }}>
              <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" disableGutters />
        <PageDrawer />
        <SettingsDrawer setSettingsDrawerOpen={setSettingsDrawerOpen} settingsDrawerOpen={settingsDrawerOpen} />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="hub" element={<HubPage />} />
          <Route path="server">
            <Route path=":serverId" element={<ServerPage />} />
          </Route>
          <Route path="profile">
            <Route path=":userId" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
