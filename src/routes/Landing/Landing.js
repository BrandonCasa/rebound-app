import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import ChatCard from "./ChatCard";
import CommunitiesCard from "./CommunitiesCard";
import ThemeCard from "./ThemeCard";

function LandingPage() {
  const theme = useTheme();

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
      <Grid item xs={6} md={4}>
        <Paper elevation={1}>
          <Typography
            variant="h3"
            fontWeight={700}
            fontSize="1.75vmax"
            component="div"
            textAlign={"center"}
            sx={{ flexGrow: 1, padding: "8px", color: theme.palette.mode === "light" ? "coral" : "orange" }}
          >
            Introducing Rebound
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h3" fontWeight={400} fontSize="0.75vmax" component="div" textAlign={"center"} sx={{ flexGrow: 1, padding: "8px", color: "text.secondary" }}>
            Online communities have never been more streamlined.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={10} height="100%">
        <Paper elevation={2} sx={{ padding: 2, height: "80vh" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={3} sm={6}>
              <ChatCard />
            </Grid>
            <Grid item md={3} sm={6}>
              <CommunitiesCard />
            </Grid>
            <Grid item md={3} sm={6}>
              <ThemeCard />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
