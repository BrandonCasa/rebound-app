import * as IconSvgs from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popover } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

const CustomPopover = styled(Popover)(({ theme }) => ({
  color: theme.palette.text.primary,
  pointerEvents: "none",
  marginTop: "7.5px",
  "& .MuiPaper-root": {
    pointerEvents: "auto",
  },
}));

function FriendActivityDropdown(props) {
  let theme = useTheme();

  const auth = getAuth();
  let [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const functions = getFunctions();

  return (
    <CustomPopover
      PaperProps={{ onMouseEnter: (event) => props.handleMenuOpen(event, true), onMouseLeave: (event) => props.handleMenuClose(true) }}
      anchorEl={props.anchorEl}
      open={props.menuOpened}
      disableRestoreFocus
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <List onClick={() => {}} sx={{ color: theme.palette.text.secondary, width: "200px", pt: 0, pb: 0 }}>
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconSvgs.AccountBox sx={{ fontSize: 24, color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="View Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconSvgs.Message sx={{ fontSize: 24, color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Message" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconSvgs.GroupAdd sx={{ fontSize: 24, color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Send Invite" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconSvgs.AddReaction sx={{ fontSize: 24, color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Modify Tags" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IconSvgs.PersonRemove sx={{ fontSize: 24, color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Remove Friend" />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomPopover>
  );
}

export default FriendActivityDropdown;
