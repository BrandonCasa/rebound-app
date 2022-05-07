// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem } from "@mui/material";
import { doc } from "firebase/firestore";
import * as React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../server/index";

function PageDrawer(props) {
  const themeMode = useSelector((state) => state.theme.actualMode);
  const themeActual = useSelector((state) => state.theme.actualTheme);
  const dispatch = useDispatch();
  const [serversCurr, setServersCurr] = React.useState([]);

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
          <p>{JSON.stringify(value ? value.data() : {})}</p>
          <ListItem
            sx={{
              height: "48px",
              backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
            }}
          >
            <IconSvgs.Crop32 sx={{ fontSize: 32, width: "100%", color: "white" }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default PageDrawer;
