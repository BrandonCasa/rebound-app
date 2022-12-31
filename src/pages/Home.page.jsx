import { Badge, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";

function FriendComponent(props) {
  let theme = useTheme();

  const Friend = styled(Card)(({ theme }) => ({
    height: "100px",
  }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      bottom: "12px",
      right: "12px",
      padding: 0,
      width: "20px",
      height: "20px",
    },
  }));

  return (
    <Friend elevation={4} sx={{ display: "flex" }}>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia sx={{ height: "100px", width: "100px" }}>
          <StyledBadge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={<div style={{ backgroundColor: "#22cc00", width: "20px", height: "20px", borderRadius: "10px", border: `3px solid ${theme.palette.background.paper}` }} />}
            sx={{ height: "100px", width: "100px" }}
          >
            <img style={{ height: "100px", width: "100px" }} src="images/img_avatar.png" alt="random" />
          </StyledBadge>
        </CardMedia>
        <CardContent sx={{ flexGrow: 1, height: "100px" }}>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography variant="subtitle2" color={theme.palette.text.secondary} component="h2">
              {props.status} | {props.activity}
            </Typography>
          </span>
        </CardContent>
      </CardActionArea>
    </Friend>
  );
}

function HomePage(props) {
  const user = useContext(AuthContext);

  return (
    <Grid container spacing={2} sx={{ display: "flex", width: "auto", justifyContent: "center" }}>
      <Grid xs={4}>
        <FriendComponent name={"Kannatron"} activity={"Overwatch 2"} status={"Online"} />
      </Grid>
    </Grid>
  );
}
export default HomePage;
