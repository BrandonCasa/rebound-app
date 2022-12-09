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
import { UserContext } from "./helpers/userContext";
import darkTheme from "./themes/darkTheme";

function App(props) {
  const [user, loading, error] = useAuthState(getAuth());

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
  return (
    <UserContext.Provider value={user || (loading ? "loading" : "not logged in")}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <CustomToolbar loading={loading} />
            <Box sx={{ margin: "12px", flexGrow: 1, height: "100%" }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
