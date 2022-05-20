import { Avatar, useTheme } from "@mui/material";
import React from "react";
import StatusBadge from "./StatusBadge";
import { auth } from "../server/index";
import UserDropMenu from "./UserDropMenu";

function UserAvatar(props: any) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>(undefined);
  const [currentTimeout, setCurrentTimeout] = React.useState<NodeJS.Timeout | undefined>(undefined);
  const [menuOpened, setMenuOpened] = React.useState<boolean>(false);

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

  return (
    <React.Fragment>
      <div onMouseEnter={(event: any) => handleMenuOpen(event, false)} onMouseLeave={() => handleMenuClose(false)}>
        <StatusBadge status={"online"}>
          <Avatar
            src={auth.currentUser ? (auth.currentUser.photoURL ? auth.currentUser.photoURL : undefined) : undefined}
            sx={{ width: 38, height: 38, boxShadow: `0 0 4px 2px ${theme.palette.background.paper}90`, cursor: "pointer" }}
          />
        </StatusBadge>
      </div>
      <UserDropMenu opened={menuOpened} anchorElement={anchorEl} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose} />
    </React.Fragment>
  );
}

export default UserAvatar;
