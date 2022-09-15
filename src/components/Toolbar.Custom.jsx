import * as IconSvgs from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDropdown } from "../helpers/dropDownHelper";
import CustomDropdown from "./DropDown.Custom";

const CustomLoginButton = styled(Button)(({ theme }) => ({
  width: 100,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0px 0px 0px 3px ${alpha("#000000", 0.15)}`,
  },
  "&:active": {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0px 0px 0px 6px ${alpha("#000000", 0.15)}`,
  },
}));

const CustomControlCenterButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: alpha("#000000", 0.35),
  "&:hover": {
    backgroundColor: alpha("#000000", 0.35),
    boxShadow: `0px 0px 0px 3px ${alpha("#000000", 0.15)}`,
  },
  "&:active": {
    backgroundColor: alpha("#000000", 0.35),
    boxShadow: `0px 0px 0px 6px ${alpha("#000000", 0.15)}`,
  },
}));

function ToolbarUserButton(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [menuOpened, anchorEl, handleMenuOpen, handleMenuClose] = useDropdown();

  const signOut = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => console.error(error));
  };

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
      <React.Fragment>
        <IconButton
          sx={{ mr: "16px", padding: "0px", height: "32px", width: "32px" }}
          onClick={signOut}
          onMouseEnter={(event) => handleMenuOpen(event, false)}
          onMouseLeave={() => handleMenuClose(false)}
        >
          <IconSvgs.AccountCircle sx={{ fontSize: 24, color: "white" }} />
        </IconButton>
        <CustomDropdown opened={menuOpened} anchorElement={anchorEl} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose} />
      </React.Fragment>
    );
  } else {
    return (
      <CustomLoginButton variant="contained" onClick={(event) => signInGoogle(event)} sx={{ mr: "10px" }}>
        Sign In
      </CustomLoginButton>
    );
  }
}

function CustomToolbar(props) {
  // iconbutton onClick={() => setSettingsDrawerOpen(true)}

  return (
    <React.Fragment>
      <AppBar position="fixed" height="48px">
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ ml: "24px" }}>
              Rebound
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <CustomControlCenterButton sx={{ padding: "0px", height: "42px", width: "42px" }}>
              <IconSvgs.AppsRounded sx={{ fontSize: 32 }} />
            </CustomControlCenterButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton sx={{ mr: "24px", padding: "0px", height: "32px", width: "32px", float: "right" }}>
              <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
            </IconButton>
            <Box sx={{ float: "right" }}>
              <ToolbarUserButton />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" disableGutters />
    </React.Fragment>
  );
}

export default CustomToolbar;
