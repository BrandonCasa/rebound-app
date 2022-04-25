// @ts-nocheck
import * as IconSvgs from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

function PageDrawer(props) {
  const themeValue = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <Drawer anchor={"left"} open={props.pageDrawerOpen} onClose={() => props.setPageDrawerOpen(false)}>
      <Box sx={{ width: 350 }}>
        <List disablePadding>
          <ListItem style={{ padding: "8px 12px" }}>
            <IconButton sx={{ padding: "6px", margin: "-6px 0px" }} onClick={() => props.setPageDrawerOpen(false)}>
              <IconSvgs.FirstPage />
            </IconButton>
            <div style={{ flexGrow: 1 }} />
            <Typography variant="h5" fontWeight={200} sx={{ mr: "12px" }}>
              Pages
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <div style={{ width: "100%" }}>pages go here</div>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default PageDrawer;
