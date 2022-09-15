import * as IconSvgs from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(undefined);
  const [currentTimeout, setCurrentTimeout] = React.useState(undefined);
  const [menuOpened, setMenuOpened] = React.useState(false);

  const handleMenuOpen = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, menu: boolean) => {
    //setCurrentTimeout("");
    clearTimeout(currentTimeout);
    if (!menu) {
      setAnchorEl(event.currentTarget);
    }
    setMenuOpened(true);
  };

  const setMenuClosed = async () => {
    setMenuOpened(false);
    //setAnchorEl(undefined);
  };

  const handleMenuClose = async (menu: boolean) => {
    if (menu) {
      setCurrentTimeout(setTimeout(setMenuClosed, 125));
    } else {
      setCurrentTimeout(setTimeout(setMenuClosed, 250));
    }
  };

  return [menuOpened, anchorEl, handleMenuOpen, handleMenuClose]
}