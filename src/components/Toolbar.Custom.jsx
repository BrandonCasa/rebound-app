import * as IconSvgs from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useDropdown } from "../helpers/dropDownHelper";
import { AuthContext } from "../helpers/usersContext";
import AccountDropdown from "./AccountDropdown";

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
  transition: "box-shadow 0.1s ease-in-out",
  "&:hover": {
    backgroundColor: alpha("#000000", 0.35),
    boxShadow: `0px 0px 3px 3px ${alpha("#000000", 0.175)}`,
  },
  "&:active": {
    backgroundColor: alpha("#000000", 0.35),
    boxShadow: `0px 0px 2px 4px ${alpha("#000000", 0.175)}`,
  },
}));

function ToolbarUserButton(props) {
  const [userAuth, userAuthLoading, userAuthError] = useContext(AuthContext);
  const navigate = useNavigate();
  const accountDropdownState = useDropdown("account");

  const signOut = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => console.error(error));
  };

  const signInGoogle = (event) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    //firebase.login({ provider: "google", type: "popup" });
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const tokenNew = credential.accessToken;
      // The signed-in user info.
      const userNew = result.user;
      accountDropdownState.forceMenuState(false);
      // ...
    });
  };
  if (!userAuthLoading && userAuth?.uid) {
    return (
      <React.Fragment>
        <IconButton
          sx={{ mr: "16px", padding: "0px", height: "32px", width: "32px" }}
          onClick={() => {
            //closeMenuEvent();
            navigate(`/profile/${userAuth?.uid?.toString()}`);
          }}
          onMouseEnter={(event) => accountDropdownState.handleMenuOpen(event, false)}
          onMouseLeave={() => accountDropdownState.handleMenuClose(false)}
        >
          <IconSvgs.AccountCircle sx={{ fontSize: 24, color: "white" }} />
        </IconButton>
        <AccountDropdown {...accountDropdownState} />
      </React.Fragment>
    );
  } else {
    return (
      <CustomLoginButton variant="contained" onClick={(event) => signInGoogle(event)} sx={{ mr: "10px", width: "125px" }}>
        Sign In
      </CustomLoginButton>
    );
  }
}

function CustomToolbar(props) {
  const [userAuth, userAuthLoading, userAuthError] = useContext(AuthContext);

  return (
    <React.Fragment>
      <AppBar position="fixed" height="48px">
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ ml: "24px" }}>
              Rebound
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton sx={{ mr: "24px", padding: "0px", height: "32px", width: "32px", float: "right" }}>
              <IconSvgs.Settings sx={{ fontSize: 24, color: "white" }} />
            </IconButton>
            <Box sx={{ float: "right", visibility: userAuthLoading ? "hidden" : "visible" }}>
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
