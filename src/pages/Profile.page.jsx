import * as IconSvgs from "@mui/icons-material";
import { Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../helpers/userContext";
import { getStorage, ref, getBlob, listAll } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { useRef } from "react";

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
  const bannerInputRef = useRef(null);

  const [expanded, setExpanded] = React.useState(false);
  const [bannerImage, setBannerImage] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBannerChange = (base64Image) => {
    // https://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob
    let functions = getFunctions();
    const auth = getAuth();
    const changeBanner = httpsCallable(functions, "changeBanner");
    changeBanner({ hasBanner: true, newBanner: base64Image }).then((result) => {
      const data = result.data;
      console.log(data);
    });
  };

  const onChangeBannerFile = (event) => {
    if (bannerInputRef.current.files.length >= 0) {
      let read = new FileReader();

      read.readAsDataURL(bannerInputRef.current.files[0]);

      read.onloadend = () => {
        console.log(read.result);
        setBannerImage(read.result);
        handleBannerChange(read.result);
      };
    }
  };

  React.useEffect(() => {
    const storage = getStorage();
    const pathReference = ref(storage, `users/${params.id}/banner`);
    listAll(pathReference)
      .then((res) => {
        getBlob(res.items[0])
          .then((blob) => {
            // 222.2 x 125
            setBannerImage(URL.createObjectURL(blob));
            console.log(blob);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, [params.id]);

  return (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <CustomCard>
          <Fragment>
            <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeBannerFile} />
            <ButtonBase onClick={() => bannerInputRef.current && bannerInputRef.current.click()} height="75" style={{ margin: "-8px" }}>
              <CardMedia component="img" height="75" image={bannerImage} alt={JSON.stringify(bannerImage)} />
            </ButtonBase>
          </Fragment>
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
