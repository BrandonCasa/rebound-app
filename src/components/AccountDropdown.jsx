import * as IconSvgs from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

const CustomMenu = styled(Menu)(({ theme }) => ({
  color: theme.palette.text.primary,
  pointerEvents: "none",
  marginTop: "7.5px",
  "& .MuiPaper-root": {
    pointerEvents: "auto",
  },
}));

function AccountDropdown(props) {
  let theme = useTheme();
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const functions = getFunctions();
  const createServer = httpsCallable(functions, 'createServer');

  const signOut = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => console.error(error));
  };

  const runTest = () => {
    createServer().then((result) => {
      console.log(result);
    });
  };

  return (
    <CustomMenu
      MenuListProps={{ disablePadding: true }}
      anchorEl={props.anchorEl}
      open={props.menuOpened}
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
        sx={{ color: theme.palette.text.secondary }}
      >
        <ListItemIcon>
          <IconSvgs.AccountBox sx={{ fontSize: 24, color: theme.palette.text.primary }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          runTest();
        }}
        sx={{ color: theme.palette.text.secondary }}
      >
        <ListItemIcon>
          <IconSvgs.SwitchAccount sx={{ fontSize: 24, color: theme.palette.text.primary }} />
        </ListItemIcon>
        <ListItemText primary="Switch Accounts" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          //closeMenuEvent();
          signOut();
        }}
        sx={{ color: theme.palette.text.secondary }}
      >
        <ListItemIcon>
          <IconSvgs.Logout sx={{ fontSize: 24, color: theme.palette.text.primary }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </CustomMenu>
  );
}

export default AccountDropdown;
