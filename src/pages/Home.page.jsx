import { Badge, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";
import { useDropdown } from "../helpers/dropDownHelper";
import FriendActivityDropdown from "../components/FriendActivityDropdown";
import { useRef } from "react";
import { useEffect } from "react";
import imgAvatar from "../img_avatar.png";
import imgOverwatch from "../overwatch.png";

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
          <img style={{ height: "100px", width: "100px" }} src={imgAvatar} alt="random" />
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
          <img style={{ height: "30px", width: "30px" }} src={imgOverwatch} alt="random" />
        </div>
      </CardContent>
    </Friend>
  );
}

function HomePage(props) {
  const user = useContext(AuthContext);
  let theme = useTheme();

  const friendActivityDropdownState = useDropdown();

  return <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, width: "100%", height: "100%" }}>xd</Box>;
}
export default HomePage;
/*
<Stack spacing={2} sx={{ height: "100%", width: "50%", minWidth: "325px" }}>
  <Box sx={{ width: "100%" }}>
    <ButtonBase
      sx={{ display: "flex", width: "100%" }}
      onMouseEnter={(event) => friendActivityDropdownState.handleMenuOpen(event, false)}
      onMouseLeave={() => friendActivityDropdownState.handleMenuClose(false)}
    >
      <FriendComponent name={"Kannatron"} activity={"Overwatch 2"} status={"Online"} />
    </ButtonBase>
    <FriendActivityDropdown {...friendActivityDropdownState} />
  </Box>
</Stack>
*/
