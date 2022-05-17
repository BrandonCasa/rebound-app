import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dropMenuSelector, openMenu, closeMenu } from "../redux/DropMenu/dropMenu.slice";
import { useAppDispatch } from "../redux/store";

function UserDropMenu(props: any) {
  const dropMenuState = useSelector(dropMenuSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openMenuEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openMenu({ menu: "userDropMenu", element: event.currentTarget }));
  };
  const closeMenuEvent = () => {
    dispatch(closeMenu({ menu: "userDropMenu" }));
  };

  return (
    <Menu anchorEl={dropMenuState.anchorElement} open={dropMenuState.openedMenus.includes("userDropMenu")} onClose={closeMenuEvent}>
      <MenuItem
        onClick={() => {
          closeMenuEvent();
          navigate(`/profile`);
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenuEvent();
          navigate(`/settings`);
        }}
      >
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenuEvent();
          props.logout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}

export default UserDropMenu;
