// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openDialog } from "redux/Dialogs/dialogs.slice";
import { auth } from "../server/index";

function PageDrawer(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myActualServers = useSelector((state) => state.firestuff.myActualServers);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredId, setHoveredId] = React.useState("");
  const [currentTimeout, setCurrentTimeout] = React.useState("");

  const handlePopoverOpen = async (event, id, popover) => {
    //setCurrentTimeout("");
    clearTimeout(currentTimeout);
    setHoveredId(id);
    if (!popover) {
      setAnchorEl(event.currentTarget);
    }
  };

  const setPopoverClosed = async () => {
    setAnchorEl(null);
  };

  const handlePopoverClose = async (popover) => {
    if (popover) {
      setCurrentTimeout(setTimeout(setPopoverClosed, 125));
    } else {
      setCurrentTimeout(setTimeout(setPopoverClosed, 250));
    }
  };

  const loadServer = async (serverId) => {
    if (serverId === "hub") {
      navigate(`/hub`);
    } else {
      navigate(`/server/${serverId}`);
    }
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
            <ListItem
              sx={{
                height: "48px",
                width: "48px",
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                borderRadius: "15px",
                margin: "6px",
                padding: "0px",
              }}
              disablePadding
            >
              <div
                style={{ width: "100%", height: "100%", padding: 0, margin: "0" }}
                onMouseEnter={(event) => handlePopoverOpen(event, "hubServer", false)}
                onMouseLeave={() => handlePopoverClose(false)}
              >
                <IconButton
                  sx={{
                    width: "38px",
                    height: "38px",
                    margin: "5px",
                    padding: 0,
                    backgroundColor: "transparent",
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                    color: theme.palette.text.primary,
                  }}
                  onClick={() => loadServer("hub")}
                >
                  <div style={{ width: "100%", height: "100%", margin: "0", padding: 0 }}>
                    <IconSvgs.Home sx={{ width: "28px", height: "28px", margin: "5px" }} fontSize={"large"} />
                  </div>
                </IconButton>
              </div>
            </ListItem>
            {Object.keys(myActualServers).map((serverId) => (
              <ListItemButton
                onClick={() => loadServer(serverId)}
                key={serverId}
                onMouseEnter={(event) => handlePopoverOpen(event, serverId, false)}
                onMouseLeave={() => handlePopoverClose(false)}
                sx={{
                  height: "48px",
                  width: "48px",
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                  borderRadius: "15px",
                  margin: "6px",
                  padding: "0px",
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    margin: "5px",
                    backgroundColor: "transparent",
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                    color: theme.palette.text.primary,
                  }}
                >
                  {myActualServers[serverId].name.length > 0 ? myActualServers[serverId].name.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "") : "?"}
                </Avatar>
              </ListItemButton>
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
              <div style={{ width: "100%", height: "100%", padding: 0 }} onMouseEnter={(event) => handlePopoverOpen(event, "addServer", false)} onMouseLeave={() => handlePopoverClose(false)}>
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
          marginLeft: "13px",
          "& .MuiPaper-root": {
            pointerEvents: "auto",
          },
        }}
        open={popoverOpen}
        anchorEl={anchorEl}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        PaperProps={{ onMouseEnter: (event) => handlePopoverOpen(event, hoveredId, true), onMouseLeave: (event) => handlePopoverClose(true) }}
      >
        <div
          style={{
            maxWidth: "250px",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            wordWrap: "break-word",
          }}
        >
          <span>
            {hoveredId === "addServer" && <span style={{ fontWeight: "bold" }}>Action: </span>}
            {hoveredId === "addServer" && "Add a server"}

            {hoveredId === "hubServer" && <span style={{ fontWeight: "bold" }}>Page: </span>}
            {hoveredId === "hubServer" && "The Hub"}

            {hoveredId !== "addServer" && hoveredId !== "hubServer" && <span style={{ fontWeight: "bold" }}>Server: </span>}
            {hoveredId !== "addServer" && hoveredId !== "hubServer" && `${myActualServers[hoveredId] && myActualServers[hoveredId].name}`}
          </span>

          {hoveredId !== "addServer" && hoveredId !== "hubServer" && <Divider sx={{ flexGrow: 1 }} />}

          <span>
            {hoveredId !== "addServer" && hoveredId !== "hubServer" && auth.currentUser && <span style={{ fontWeight: "bold" }}>Code: </span>}
            {hoveredId !== "addServer" && hoveredId !== "hubServer" && auth.currentUser && hoveredId.substring(0, 6)}

            {!auth.currentUser && hoveredId !== "hubServer" && <Divider sx={{ flexGrow: 1 }} />}
            {!auth.currentUser && hoveredId !== "hubServer" && <span style={{ fontWeight: "bold" }}>Error: </span>}
            {!auth.currentUser && hoveredId !== "hubServer" && "Please log in."}
          </span>
        </div>
      </Popover>
    </React.Fragment>
  );
}

export default PageDrawer;
