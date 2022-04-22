import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import isDev from "../../helpers/devDetect";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "&": {
    border: "1px solid #1f1f1f",
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

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        props.setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

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
              <StyledToggleButtonGroup value="dark" exclusive fullWidth>
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
