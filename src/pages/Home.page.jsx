import { Badge, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";
import { useDropdown } from "../helpers/dropDownHelper";
import FriendActivityDropdown from "../components/FriendActivityDropdown";
import { useRef } from "react";
import { useEffect } from "react";

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
    <Friend elevation={4} sx={{ display: "flex", flexGrow: 1 }}>
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
      <CardContent
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "100px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        }}
      >
        <span style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="subtitle2" color={theme.palette.text.secondary} component="h2">
            {props.status} | {props.activity}
          </Typography>
        </span>
        <div
          style={{
            height: "36px",
            width: "36px",
            backgroundColor: "white",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            padding: "3px",
            boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.75)",
            right: "8px",
            bottom: "8px",
          }}
        >
          <img style={{ height: "30px", width: "30px" }} src="images/overwatch.png" alt="random" />
        </div>
      </CardContent>
    </Friend>
  );
}

function HomePage(props) {
  const user = useContext(AuthContext);

  const friendActivityDropdownState = useDropdown();

  return (
    <Grid container spacing={2} sx={{ display: "flex", width: "auto", justifyContent: "center" }}>
      <Grid xs={12} sm={4} sx={{ display: "flex", flexGrow: 1 }}>
        <ButtonBase
          sx={{ display: "flex", flexGrow: 1 }}
          onMouseEnter={(event) => friendActivityDropdownState.handleMenuOpen(event, false)}
          onMouseLeave={() => friendActivityDropdownState.handleMenuClose(false)}
        >
          <FriendComponent name={"Kannatron"} activity={"Overwatch 2"} status={"Online"} />
        </ButtonBase>
        <FriendActivityDropdown {...friendActivityDropdownState} />
      </Grid>
    </Grid>
  );
}
export default HomePage;
