import * as IconSvgs from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const CustomMenu = styled(Menu)(({ theme }) => ({
  pointerEvents: "none",
  marginTop: "7.5px",
  "& .MuiPaper-root": {
    pointerEvents: "auto",
  },
}));

function CustomDropdown(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const signOut = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => console.error(error));
  };

  return (
    <CustomMenu
      MenuListProps={{ disablePadding: true }}
      anchorEl={props.anchorElement}
      open={props.opened}
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
          navigate(`/profile/${user?.uid?.toString()}`);
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
    </CustomMenu>
  );
}

export default CustomDropdown;
