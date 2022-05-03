import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import ChatCard from "./ChatCard";
import CommunitiesCard from "./CommunitiesCard";
import ThemeCard from "./ThemeCard";

function LandingPage() {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
        <Grid item xs={8} sm={6} md={4}>
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
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ pt: 0, pl: 2, pr: 2, pb: 2, flexGrow: 1 }}>
        <Grid item xs={10} height="100%">
          <Paper elevation={2} sx={{ padding: 2, minHeight: "75%", maxHeight: "auto" }}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
