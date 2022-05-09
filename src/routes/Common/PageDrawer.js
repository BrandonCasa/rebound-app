// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "redux/Dialogs/dialogs.slice";
import { auth } from "../../server/index";

function PageDrawer(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

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
      <Drawer anchor={"left"} open={true} variant="permanent">
        <Box sx={{ width: 60 }}>
          <List sx={{ width: "100%" }}>
            <ListItem
              sx={{
                margin: "-8px 0px 0px 0px",
                height: "48px",
                backgroundColor: theme.palette.primary.dark,
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
              <div style={{ width: "100%", height: "100%", padding: 0 }} onMouseEnter={(event) => handlePopoverOpen(event, "addServer")} onMouseLeave={() => handlePopoverClose()}>
                <IconButton sx={{ width: "100%", height: "100%", padding: 0 }} onClick={() => dispatch(openDialog("serverDialog"))} disabled={!auth.currentUser}>
                  <div style={{ width: 28, height: 28, margin: "10px", padding: 0 }}>
                    <IconSvgs.Add sx={{ width: "100%", height: "100%", color: "limegreen" }} />
                  </div>
                </IconButton>
              </div>
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
            height: hoveredId === "addServer" ? (auth.currentUser ? "32px" : "64px") : "64px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            <span style={{ fontWeight: "bold" }}>{hoveredId === "addServer" ? "Action:" : "Name:"}</span>
            {hoveredId === "addServer" ? "Add a server" : myActualServers[hoveredId] && myActualServers[hoveredId].name}
          </span>
          {hoveredId !== "addServer" && (
            <React.Fragment>
              <Divider sx={{ flexGrow: 1 }} />
              <span>
                <span style={{ fontWeight: "bold" }}>Code: </span>
                {hoveredId.substring(0, 6)}
              </span>
            </React.Fragment>
          )}
          {!auth.currentUser && (
            <React.Fragment>
              <Divider sx={{ flexGrow: 1 }} />
              <span>
                <span style={{ fontWeight: "bold" }}>Error: </span>
                Please login.
              </span>
            </React.Fragment>
          )}
        </div>
      </Popover>
    </React.Fragment>
  );
}

export default PageDrawer;
