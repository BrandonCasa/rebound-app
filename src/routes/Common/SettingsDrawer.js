// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "redux/Theme/theme.slice";
import isDev from "../../helpers/devDetect";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "&": {
    border: `2px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function SettingsDrawer(props) {
  const themeValue = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  // Function Methods
  const signInDev = () => {
    if (isDev()) {
      const config = require("../../dev_config/config.js");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, config.email, config.password);
    }
  };

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
                  dispatch(setMode(newTheme));
                }}
              >
                <ToggleButton value="dark">
                  <IconSvgs.DarkMode />
                  <span style={{ width: "6px" }} />
                  Dark
                </ToggleButton>
                <ToggleButton value="system">
                  <IconSvgs.SettingsBrightness />
                  <span style={{ width: "6px" }} />
                  System
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
