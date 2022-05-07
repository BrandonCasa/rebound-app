// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, List, ListItem } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

function PageDrawer(props) {
  const themeMode = useSelector((state) => state.theme.actualMode);
  const themeActual = useSelector((state) => state.theme.actualTheme);
  const dispatch = useDispatch();
  const [serversCurr, setServersCurr] = React.useState([]);
  const myActualServers = useSelector((state) => state.firestuff.myActualServers);

  /*
  const [value, loading, error] = useDocument(doc(db, "users", auth.currentUser ? auth.currentUser.uid : "1"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  React.useEffect(() => {
    const servers = value ? (value.data() !== undefined ? value.data().servers : []) : [];
    if (servers && servers.length > 0) {
      const newServers = servers.filter((x) => !serversCurr.includes(x));
      console.log("allServers", servers);
      console.log("newServers", newServers);
      for (const newServer of newServers) {
        // Request the server info
      }
      setServersCurr(servers);
    }
  }, [value]);
*/
  const getServers = () => {
    const servers = myActualServers ? Object.keys(myActualServers) : [];
    servers.forEach((serverId) => {});
  };
  return (
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
              disablePadding
            >
              <Avatar sx={{ width: 38, height: 38, margin: "5px" }}>{myActualServers[serverId].name.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "")}</Avatar>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default PageDrawer;
