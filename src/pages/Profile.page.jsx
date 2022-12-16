import * as IconSvgs from "@mui/icons-material";
import { Box, Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../helpers/userContext";
import { getStorage, ref, getBlob, listAll } from "firebase/storage";
import { getFunctions, httpsCallable, HttpsCallableOptions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { useRef } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CryptoJS from "crypto-js";
import { getApp } from "firebase/app";
import userBannerBase from "../userBanner.png";

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
  const [bannerImage, setBannerImage] = React.useState(undefined);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBannerChange = (base64Image) => {
    // https://stackoverflow.com/questions/13333378/how-can-javascript-upload-a-blob
    let functions = getFunctions(getApp(), "us-central1");
    const auth = getAuth();
    const changeBanner = httpsCallable(functions, "changeBanner", {});
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
    if (props.userDoc?.data()?.bannerName != undefined) {
      if (bannerImage != null) {
        const currentType = bannerImage.substring(5, bannerImage.substring(0, 25).indexOf(";"));
        const currentNameHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(bannerImage)).toString().substring(0, 25) + "." + currentType.split("/")[1];
        if (currentNameHash == props.userDoc?.data()?.bannerName) {
          return;
        }
      }
      const pathReference = ref(storage, `users/${params.id}/banner/${props.userDoc?.data()?.bannerName}`);
      getBlob(pathReference, undefined)
        .then((blob) => {
          // 222.2 x 125
          setBannerImage(URL.createObjectURL(blob));
          console.log("banner updated");
          //console.log(blob);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBannerImage(userBannerBase);
    }
  }, [props.userDoc?.data()?.bannerName]);

  return (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <CustomCard>
          <Fragment>
            <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeBannerFile} />
            <ButtonBase
              disabled={!(props.user.uid === params.id)}
              onClick={() => bannerInputRef.current && bannerInputRef.current.click()}
              style={{ margin: "-8px", height: "75px", width: "345px", outline: "none", border: "none" }}
            >
              <CardMedia
                component="img"
                image={bannerImage}
                alt={JSON.stringify(bannerImage)}
                style={{ height: "75px", width: "345px", outline: "none", border: "none", visibility: bannerImage ? "visible" : "hidden" }}
              />
              <Typography style={{ position: "fixed" }} sx={{ color: theme.palette.text.secondary, visibility: !(props.user.uid === params.id) ? "hidden" : "visible" }}>
                Change Banner
                <br />
                <IconSvgs.AddAPhoto sx={{ color: theme.palette.text.secondary }} />
              </Typography>
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
        <Item>{params.id}</Item>
      </Grid>
    </Grid>
  );
}

function ProfilePage(props) {
  let params = useParams();
  const [userDoc, loadingDoc, errorDoc] = useDocument(doc(getFirestore(), "users", params.id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [user, loadingUser, errorUser] = useAuthState(getAuth());
  if (loadingUser || loadingDoc) {
    return (
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <CircularProgress size={120} />
      </Box>
    );
  }
  if (errorUser) {
    return "Error";
  }
  if (!user) {
    return "Please login.";
  }
  return <ProfileAuthenticated userDoc={userDoc} user={user} />;
}

export default ProfilePage;
