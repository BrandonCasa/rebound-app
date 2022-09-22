import * as IconSvgs from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const CustomMenu = styled(Menu)(({ theme }) => ({
  color: "white",
  pointerEvents: "none",
  marginTop: "7.5px",
  "& .MuiPaper-root": {
    pointerEvents: "auto",
  },
}));

function ControlCenterDropdown(props) {
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
        sx={{ color: "white" }}
      >
        <ListItemIcon>
          <IconSvgs.AccountBox sx={{ fontSize: 24, color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          navigate(`/settings`);
        }}
        sx={{ color: "white" }}
      >
        <ListItemIcon>
          <IconSvgs.SettingsApplications sx={{ fontSize: 24, color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          signOut();
        }}
        sx={{ color: "white" }}
      >
        <ListItemIcon>
          <IconSvgs.SwitchAccount sx={{ fontSize: 24, color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Switch Accounts" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          signOut();
        }}
        sx={{ color: "white" }}
      >
        <ListItemIcon>
          <IconSvgs.Logout sx={{ fontSize: 24, color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </CustomMenu>
  );
}

export default ControlCenterDropdown;
