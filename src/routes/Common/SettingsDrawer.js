// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "redux/Theme/theme.slice";

function SettingsDrawer(props) {
  const themeValue = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <Drawer anchor={"right"} open={props.settingsDrawerOpen} onClose={() => props.setSettingsDrawerOpen(false)}>
      <Box sx={{ width: 350 }}>
        <List sx={{ width: "100%" }}>
          <ListItem sx={{ margin: "-8px 0px 0px 0px", height: "48px" }}>
            <IconSvgs.Settings sx={{ fontSize: 32 }} />
            <ListItemText primary="Settings" sx={{ textAlign: "center" }} />
            <IconButton sx={{ padding: "6px", margin: "6px 0px", float: "right", right: "-4px" }} onClick={() => props.setSettingsDrawerOpen(false)}>
              <IconSvgs.LastPage />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Theme" />
          </ListItem>
          <ListItem>
            <ToggleButtonGroup
              value={themeValue}
              fullWidth
              exclusive
              onChange={(event, newTheme) => {
                if (newTheme !== null) {
                  dispatch(setMode(newTheme));
                }
              }}
            >
              <ToggleButton value="system">
                <IconSvgs.SettingsBrightness />
                System
              </ToggleButton>
              <ToggleButton value="dark">
                <IconSvgs.DarkMode />
                Dark
              </ToggleButton>
              <ToggleButton value="light">
                <IconSvgs.LightMode />
                Light
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SettingsDrawer;
