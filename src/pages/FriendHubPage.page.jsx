import { Badge, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";
import { useDropdown } from "../helpers/dropDownHelper";
import FriendActivityDropdown from "../components/FriendActivityDropdown";

function FriendHubPage(props) {
  const user = useContext(AuthContext);
  let theme = useTheme();

  return <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>xd</Box>;
}
export default FriendHubPage;
