// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ToggleButton, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "redux/Theme/theme.slice";
import StyledToggleButtonGroup from "./StyledToggleButtonGroup.comp";

function SettingsDrawer(props) {
  const themeValue = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  // Function Hooks
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setCurrentUser(user);
      } else {
        props.setCurrentUser(null);
      }
    });
  }, []);

  return (
    <Drawer anchor={"right"} open={props.settingsDrawerOpen} onClose={() => props.setSettingsDrawerOpen(false)}>
      <Box sx={{ width: 350 }}>
        <List disablePadding>
          <ListItem style={{ padding: "8px 12px" }}>
            <Typography variant="h5" fontWeight={200}>
              Settings
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <IconButton sx={{ padding: "6px", margin: "-6px 0px" }} onClick={() => props.setSettingsDrawerOpen(false)}>
              <IconSvgs.LastPage />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <div style={{ width: "100%" }}>
              <ListItemText primary={"Theme"} sx={{ color: "text.secondary" }} />
              <StyledToggleButtonGroup
                value={themeValue}
                exclusive
                fullWidth
                onChange={(event, newTheme) => {
                  if (newTheme !== null) {
                    dispatch(setMode(newTheme));
                  }
                }}
              >
                <ToggleButton value="system">
                  <IconSvgs.SettingsBrightness />
                  <span style={{ width: "6px" }} />
                  System
                </ToggleButton>
                <ToggleButton value="dark">
                  <IconSvgs.DarkMode />
                  <span style={{ width: "6px" }} />
                  Dark
                </ToggleButton>
                <ToggleButton value="light">
                  <IconSvgs.LightMode />
                  <span style={{ width: "6px" }} />
                  Light
                </ToggleButton>
              </StyledToggleButtonGroup>
            </div>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SettingsDrawer;
