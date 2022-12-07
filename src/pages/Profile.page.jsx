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
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CryptoJS from "crypto-js";
import { getApp } from "firebase/app";

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

function ProfileAuthenticated(props) {
  let params = useParams();
  let theme = useTheme();
  const bannerInputRef = useRef(null);

  const [expanded, setExpanded] = React.useState(false);
  const [bannerImage, setBannerImage] = React.useState(null);
  const [valuexd, loadingDoc, errorDoc] = useDocument(doc(getFirestore(), "users", props.user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBannerChange = (base64Image) => {
    // https://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob
    let functions = getFunctions(getApp(), "us-central1");
    const auth = getAuth();
    const changeBanner = httpsCallable(functions, "changeBanner");
    changeBanner({ hasBanner: true, newBanner: base64Image }).then((result) => {
      const data = result.data;
      //console.log(data);
    });
  };

  const onChangeBannerFile = (event) => {
    if (bannerInputRef.current.files.length >= 0) {
      let read = new FileReader();

      read.readAsDataURL(bannerInputRef.current.files[0]);

      read.onloadend = () => {
        //console.log(read.result);
        setBannerImage(read.result);
        handleBannerChange(read.result);
      };
    }
  };

  React.useEffect(() => {
    const storage = getStorage();
    if (valuexd?.data()?.bannerName != undefined) {
      if (bannerImage != null) {
        const currentType = bannerImage.substring(5, bannerImage.substring(0, 25).indexOf(";"));
        const currentNameHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(bannerImage)).toString().substring(0, 25) + "." + currentType.split("/")[1];
        if (currentNameHash == valuexd?.data()?.bannerName) {
          return () => {};
        }
      }
      const pathReference = ref(storage, `users/${params.id}/banner/${valuexd?.data()?.bannerName}`);
      getBlob(pathReference, undefined)
        .then((blob) => {
          // 222.2 x 125
          setBannerImage(URL.createObjectURL(blob));
          //console.log(blob);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {};
  }, [valuexd?.data()?.bannerName]);

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
            title={"Kannatron"}
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

function ProfilePage(props) {
  const [user, loadingUser, errorUser] = useAuthState(getAuth());
  if (user) {
    return <ProfileAuthenticated user={user} />;
  } else {
    return "Please login to view profiles.";
  }
}

export default ProfilePage;
