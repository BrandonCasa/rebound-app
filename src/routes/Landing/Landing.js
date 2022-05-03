import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import ChatCard from "./ChatCard";
import CommunitiesCard from "./CommunitiesCard";
import ThemeCard from "./ThemeCard";

function LandingPage() {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center" }}>
      <div style={{ width: "50%", minWidth: "225px" }}>
        <Paper elevation={1} sx={{ margin: 2 }}>
          <Typography variant="h3" fontWeight={700} fontSize="24px" component="div" textAlign={"center"} sx={{ padding: "8px", color: theme.palette.mode === "light" ? "coral" : "orange" }}>
            Introducing Rebound
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h3" fontWeight={400} fontSize="18px" component="div" textAlign={"center"} sx={{ flexGrow: 1, padding: "8px", color: "text.secondary" }}>
            Online communities have never been more streamlined.
          </Typography>
        </Paper>
      </div>
      <div style={{ width: "100%" }}>
        <Paper elevation={2} sx={{ margin: 2, mt: 0, padding: 2, minHeight: "25%", maxHeight: "auto", flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={4} sm={6} xs={12}>
              <ChatCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <CommunitiesCard />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ThemeCard />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
