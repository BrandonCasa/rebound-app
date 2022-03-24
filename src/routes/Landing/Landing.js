import { Divider, Paper, Typography } from "@mui/material";
import * as React from "react";
import ChatCard from "./ChatCard";

function LandingPage() {
  return (
    <div>
      <Paper elevation={3} sx={{ margin: "32px 35vw" }}>
        <Typography variant="h3" fontWeight={700} fontSize="1.75vmax" component="div" textAlign={"center"} sx={{ flexGrow: 1, padding: "8px", color: "orange" }}>
          Introducing Rebound
        </Typography>
        <Divider />
        <Typography variant="h3" fontWeight={400} fontSize="0.75vmax" component="div" textAlign={"center"} sx={{ flexGrow: 1, padding: "8px", color: "gray" }}>
          Online communities have never been more streamlined.
        </Typography>
      </Paper>
      <div style={{ margin: "32px 16px", flexGrow: 1, justifyContent: "center", display: "flex" }}>
        <div style={{ margin: "0px 16px" }}>
          <ChatCard />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
