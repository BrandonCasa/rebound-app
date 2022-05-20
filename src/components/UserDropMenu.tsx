import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { auth } from "../server/index";
import * as IconSvgs from "@mui/icons-material";

function UserDropMenu(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut().catch((error) => console.error(error));
  };

  return (
    <Menu
      MenuListProps={{ disablePadding: true }}
      anchorEl={props.anchorElement}
      open={props.opened}
      sx={{
        pointerEvents: "none",
        marginTop: "7.5px",
        "& .MuiPaper-root": {
          pointerEvents: "auto",
        },
      }}
      disableRestoreFocus
      PaperProps={{ onMouseEnter: (event) => props.handleMenuOpen(event, true), onMouseLeave: (event) => props.handleMenuClose(true) }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          navigate(`/profile`);
        }}
      >
        <ListItemIcon>
          <IconSvgs.AccountBox />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          navigate(`/settings`);
        }}
      >
        <ListItemIcon>
          <IconSvgs.SettingsApplications />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          signOut();
        }}
      >
        <ListItemIcon>
          <IconSvgs.SwitchAccount />
        </ListItemIcon>
        <ListItemText primary="Switch Accounts" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          signOut();
        }}
      >
        <ListItemIcon>
          <IconSvgs.Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
}

export default UserDropMenu;
