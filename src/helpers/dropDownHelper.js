import React from "react";

export function useDropdown(type) {
  const [anchorEl, setAnchorEl] = React.useState(undefined);
  const [currentTimeout, setCurrentTimeout] = React.useState(undefined);
  const [menuOpened, setMenuOpened] = React.useState(false);

  const handleMenuOpen = async (event, menu) => {
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

  const handleMenuClose = async (menu) => {
    if (menu) {
      setCurrentTimeout(setTimeout(setMenuClosed, 100));
    } else {
      setCurrentTimeout(setTimeout(setMenuClosed, 300));
    }
  };

  return { menuOpened, anchorEl, handleMenuOpen, handleMenuClose };
}
