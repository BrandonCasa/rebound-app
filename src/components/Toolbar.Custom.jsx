import * as IconSvgs from "@mui/icons-material";
import { ButtonBase, AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
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
      navigate(`/home/`);
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
  let theme = useTheme();
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar position="fixed" height="48px">
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <ButtonBase
              sx={{
                ml: 2,
                borderRadius: 1,
                backgroundColor: `${theme.palette.primary.dark}75`,
                transition: "background-color 0.1s ease-in-out",
                "&:hover": {
                  background: `${theme.palette.primary.dark}`,
                },
              }}
              onClick={() => {
                if (userAuthLoading) return;
                if (userAuth?.uid) navigate(`/home/`);
                else navigate(`/`);
              }}
            >
              <Typography variant="h6" component="div" sx={{ pl: 1, pr: 1 }}>
                Rebound
              </Typography>
              <IconSvgs.Home sx={{ fontSize: 28, color: "white", pr: 1 }} />
            </ButtonBase>
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
      <Toolbar variant="dense" disableGutters height="48px" />
    </React.Fragment>
  );
}

export default CustomToolbar;
