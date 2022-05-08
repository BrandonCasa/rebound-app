// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, Popover } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../server/index";

function PageDrawer(props) {
  const themeMode = useSelector((state) => state.theme.actualMode);
  const themeActual = useSelector((state) => state.theme.actualTheme);
  const dispatch = useDispatch();
  const [serversCurr, setServersCurr] = React.useState([]);
  const myActualServers = useSelector((state) => state.firestuff.myActualServers);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredId, setHoveredId] = React.useState("");

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setHoveredId(id);
  };

  const handlePopoverClose = async () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Drawer anchor={"left"} open={true} onClose={() => props.setPageDrawerOpen(false)} variant="permanent">
        <Box sx={{ width: 60 }}>
          <List sx={{ width: "100%" }}>
            <ListItem
              sx={{
                margin: "-8px 0px 0px 0px",
                height: "48px",
                backgroundColor: themeActual.palette.primary.dark,
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
              }}
            >
              <IconSvgs.Dns sx={{ fontSize: 32, width: "100%", color: "white" }} />
            </ListItem>
            <Divider />
            {Object.keys(myActualServers).map((serverId) => (
              <ListItem
                key={serverId}
                sx={{
                  height: "48px",
                  width: "48px",
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                  borderRadius: "15px",
                  margin: "6px",
                }}
                onMouseEnter={(event) => handlePopoverOpen(event, serverId)}
                onMouseLeave={() => handlePopoverClose()}
                disablePadding
              >
                <Avatar sx={{ width: 38, height: 38, margin: "5px" }}>
                  {myActualServers[serverId].name.length > 0 ? myActualServers[serverId].name.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "") : "?"}
                </Avatar>
              </ListItem>
            ))}
            <ListItem
              sx={{
                height: "48px",
                width: "48px",
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                borderRadius: "30px",
                margin: "6px",
              }}
              disabled={!auth.currentUser}
              disablePadding
            >
              <IconButton sx={{ width: "100%", height: "100%", padding: 0 }} onClick={() => props.setServerDialogOpen(true)} disabled={!auth.currentUser}>
                <div style={{ width: 28, height: 28, margin: "10px", padding: 0 }}>
                  <IconSvgs.Add sx={{ width: "100%", height: "100%", color: "limegreen" }} />
                </div>
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Popover
        sx={{
          pointerEvents: "none",
          marginLeft: "12px",
        }}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <div
          style={{
            height: "64px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            <span style={{ fontWeight: "bold" }}>Name: </span>
            {myActualServers[hoveredId] ? myActualServers[hoveredId].name : "No server"}
          </span>
          <Divider sx={{ flexGrow: 1 }} />
          <span>
            <span style={{ fontWeight: "bold" }}>Code: </span>
            {hoveredId.substring(0, 6)}
          </span>
        </div>
      </Popover>
    </React.Fragment>
  );
}

export default PageDrawer;
