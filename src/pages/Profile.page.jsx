import * as IconSvgs from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../helpers/userContext";
import { getStorage, ref, getBlob } from "firebase/storage";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CustomCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  maxWidth: 345,
}));

function ProfilePage(props) {
  let params = useParams();
  let theme = useTheme();
  const user = useContext(UserContext);
  const storage = getStorage();
  const pathReference = ref(storage, `users/${params.id}/banner/userBanner.png`);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let bannerImage = null;
  getBlob(pathReference)
    .then((blob) => {
      bannerImage = URL.createObjectURL(blob);
    })
    .catch((error) => {});

  return (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <CustomCard>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: theme.palette.primary.light }} aria-label="recipe">
                K
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <IconSvgs.MoreVert sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            }
            title="Kannatron"
            subheader="Joined: September 2022"
          />
          <CardMedia component="img" height="125" image="https://cdn.discordapp.com/banners/249653920081772544/a_f36332f5ea27fb5b3ccf137ed26c5d37.gif?size=600" alt="Banner" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              certified troller
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <IconSvgs.Favorite sx={{ color: theme.palette.text.primary }} />
            </IconButton>
            <IconButton>
              <IconSvgs.Share sx={{ color: theme.palette.text.primary }} />
            </IconButton>
            <Button variant="contained" sx={{ marginLeft: "auto" }}>
              Add Friend
            </Button>
          </CardActions>
        </CustomCard>
      </Grid>
      <Grid xs={8} xsOffset={2}>
        <Item>{params.profileId}</Item>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
