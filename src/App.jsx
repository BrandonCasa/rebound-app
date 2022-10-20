import { Box, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import CustomToolbar from "./components/Toolbar.Custom";
import LandingPage from "./pages/Landing.page";
import ProfilePage from "./pages/Profile.page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function MainAppContainer(props) {
  return (
    <ThemeProvider theme={props.darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CustomToolbar />
          <Box sx={{ margin: "12px", flexGrow: 1, height: "100%" }}>{props.children}</Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signInGoogle = (event) => {
    const auth = getAuth();
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
  if (loading) {
    return (
      <MainAppContainer darkTheme={props.darkTheme}>
        <Typography variant="h4">Loading...</Typography>
      </MainAppContainer>
    );
  } else if (!user) {
    return (
      <MainAppContainer darkTheme={props.darkTheme}>
        <Typography variant="h4">Please Login.</Typography>
      </MainAppContainer>
    );
  } else if (user) {
    return (
      <MainAppContainer darkTheme={props.darkTheme}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainAppContainer>
    );
  } else {
    return (
      <MainAppContainer darkTheme={props.darkTheme}>
        <Typography variant="h4">Error.</Typography>
      </MainAppContainer>
    );
  }
}

export default App;
