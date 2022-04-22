import * as IconSvgs from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemText, ThemeProvider, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import getDesignTokens from "helpers/designTokens";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "routes/Landing/Landing";
import isDev from "./helpers/devDetect";

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

function App() {
  // Function State
  const [currentUser, setCurrentUser] = React.useState(null);
  const [settingsDrawer, setSettingsDrawer] = React.useState(false);
  const [mode, setMode] = React.useState("dark");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Function Methods
  const signInDev = () => {
    if (isDev()) {
      const config = require("./dev_config/config.js");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, config.email, config.password);
    }
  };

  // Function Hooks
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <ThemeProvider theme={theme}>
        <div style={{ width: "100%", height: "100%", backgroundColor: theme.palette.background.default, overflow: "hidden" }}>
          <BrowserRouter>
            <AppBar position="static">
              <Toolbar variant="dense" disableGutters>
                <IconButton edge="start" color="inherit" sx={{ ml: "12px", mr: "12px", padding: "6px" }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Rebound
                </Typography>
                {currentUser ? (
                  <Typography variant="h6" component="div">
                    {currentUser.uid}
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={signInDev}>
                    Login
                  </Button>
                )}
                <IconButton onClick={() => setSettingsDrawer(true)} sx={{ mr: "12px", ml: "12px", padding: "6px" }}>
                  <IconSvgs.Settings sx={{ fontSize: 24 }} />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer anchor={"right"} open={settingsDrawer} onClose={() => setSettingsDrawer(false)}>
              <Box sx={{ width: 350 }}>
                <List disablePadding>
                  <ListItem style={{ padding: "8px 12px" }}>
                    <Typography variant="h5" fontWeight={200}>
                      Settings
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton sx={{ padding: "6px", margin: "-6px 0px" }} onClick={() => setSettingsDrawer(false)}>
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
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
