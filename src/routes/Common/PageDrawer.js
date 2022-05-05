// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

function PageDrawer(props) {
  const themeMode = useSelector((state) => state.theme.actualMode);
  const themeActual = useSelector((state) => state.theme.actualTheme);
  const dispatch = useDispatch();
  console.log(themeActual.components);

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
        </List>
      </Box>
    </Drawer>
  );
}

export default PageDrawer;
