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
  const avatarInputRef = useRef(null);

  const [expanded, setExpanded] = React.useState(false);
  const [bannerImage, setBannerImage] = React.useState(undefined);
  const [avatarImage, setAvatarImage] = React.useState(undefined);
  const [uploadingBanner, setUploadingBanner] = React.useState(false);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  const onChangeBannerFile = (event) => {
    if (bannerInputRef.current.files.length >= 0) {
      setUploadingBanner(true);
      let read = new FileReader();

      read.readAsDataURL(bannerInputRef.current.files[0]);

      read.onloadend = () => {
        //console.log(read.result);
        setBannerImage(read.result);

        let functions = getFunctions(getApp(), "us-central1");
        const auth = getAuth();
        const changeBanner = httpsCallable(functions, "changeBanner", {});
        changeBanner({ newBanner: read.result }).then((result) => {
          const data = result.data;
          //console.log(data);
        });
        bannerInputRef.current.files = [];
      };
    }
  };

  const onChangeAvatarFile = (event) => {
    if (avatarInputRef.current.files.length >= 0) {
      setUploadingAvatar(true);
      let read = new FileReader();

      read.readAsDataURL(avatarInputRef.current.files[0]);

      read.onloadend = () => {
        //console.log(read.result);
        setAvatarImage(read.result);

        let functions = getFunctions(getApp(), "us-central1");
        const auth = getAuth();
        const changeAvatar = httpsCallable(functions, "changeAvatar", {});
        changeAvatar({ newAvatar: read.result }).then((result) => {
          const data = result.data;
          //console.log(data);
        });
        avatarInputRef.current.files = [];
      };
    }
  };

  React.useEffect(() => {
    const storage = getStorage();

    // Banner
    if (props.userDoc?.data()?.bannerChanging == false) {
      // If the banner is not changing, show the banner
      if (props.userDoc?.data()?.bannerName == undefined || props.userDoc?.data()?.bannerName == null) {
        // If the banner does not exist, show the default banner
        setUploadingBanner(false);
        setBannerImage(userBannerBase);
      } else {
        // If the banner exists, show the stored banner
        setUploadingBanner(false);
        if (bannerImage != null) {
          // If there is currently a banner, check if it is the same as the stored banner
          const bannerType = bannerImage.substring(5, bannerImage.substring(0, 25).indexOf(";"));
          const bannerFileName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(bannerImage)).toString().substring(0, 16) + "." + bannerType.split("/")[1];
          if (bannerFileName == props.userDoc?.data()?.bannerName) {
            // If the banner is the same as the stored banner, do not update the banner
            return;
          }
        }
        const pathReference = ref(storage, `users/${params.id}/banner/${props.userDoc?.data()?.bannerName}`);
        getBlob(pathReference, undefined)
          .then((blob) => {
            setBannerImage(URL.createObjectURL(blob));
            console.log("banner updated");
            //console.log(blob);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [props.userDoc?.data()?.bannerName, props.userDoc?.data()?.bannerChanging]);

  React.useEffect(() => {
    const storage = getStorage();

    // Avatar
    if (props.userDoc?.data()?.avatarChanging == false) {
      // If the avatar is not changing, show the avatar
      if (props.userDoc?.data()?.avatarName == undefined || props.userDoc?.data()?.avatarName == null) {
        // If the avatar does not exist, show the default avatar
        setUploadingAvatar(false);
        setAvatarImage(null);
      } else {
        // If the avatar exists, show the stored avatar
        setUploadingAvatar(false);
        if (avatarImage != null) {
          // If there is currently a avatar, check if it is the same as the stored avatar
          const avatarType = avatarImage.substring(5, avatarImage.substring(0, 25).indexOf(";"));
          const avatarFileName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(avatarImage)).toString().substring(0, 16) + "." + avatarType.split("/")[1];
          if (avatarFileName == props.userDoc?.data()?.avatarName) {
            // If the avatar is the same as the stored avatar, do not update the avatar
            return;
          }
        }
        const pathReference = ref(storage, `users/${params.id}/avatar/${props.userDoc?.data()?.avatarName}`);
        getBlob(pathReference, undefined)
          .then((blob) => {
            setAvatarImage(URL.createObjectURL(blob));
            console.log("avatar updated");
            //console.log(blob);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [props.userDoc?.data()?.avatarName, props.userDoc?.data()?.avatarChanging]);

  let canEditBanner = props.user.uid === params.id && (props.userDoc?.data()?.bannerChanging == false || props.userDoc?.data()?.bannerChanging == undefined) && uploadingBanner == false;
  let canEditAvatar = props.user.uid === params.id && (props.userDoc?.data()?.avatarChanging == false || props.userDoc?.data()?.avatarChanging == undefined) && uploadingAvatar == false;

  return (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <CustomCard>
          <Fragment>
            <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeBannerFile} />
            <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeAvatarFile} />
            <ButtonBase
              disabled={!(props.user.uid === params.id)}
              onClick={() => bannerInputRef.current && bannerInputRef.current.click()}
              style={{ margin: "-8px", height: "75px", width: "345px", outline: "none", border: "none" }}
            >
              <CardMedia
                component="img"
                image={bannerImage}
                alt={"Error loading banner"}
                style={{
                  height: "75px",
                  width: "345px",
                  outline: "none",
                  border: "none",
                  visibility: bannerImage ? "visible" : "hidden",
                  opacity: props.userDoc?.data()?.bannerChanging == true || uploadingBanner == true ? "0.5" : "1.0",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "64px",
                  height: "64px",
                  justifyContent: "center",
                  position: "fixed",
                  visibility: props.userDoc?.data()?.bannerChanging || uploadingBanner == true ? "visible" : "hidden",
                }}
              >
                <CircularProgress size="64px" />
              </Box>
              <Typography style={{ position: "fixed" }} sx={{ color: theme.palette.text.secondary, visibility: canEditBanner ? "visible" : "hidden" }}>
                Change Banner
                <br />
                <IconSvgs.AddAPhoto sx={{ color: theme.palette.text.secondary }} />
              </Typography>
            </ButtonBase>
          </Fragment>
          <CardHeader
            sx={{ marginTop: "8px" }}
            avatar={
              <ButtonBase
                disabled={!(props.user.uid === params.id)}
                onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                style={{ width: "40px", height: "40px", outline: "none", border: "none", borderRadius: "20px" }}
              >
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  <img
                    src={avatarImage}
                    alt={"Error loading avatar"}
                    style={{
                      height: "40px",
                      width: "40px",
                      position: "fixed",
                      borderRadius: "20px",
                      border: "2px solid grey",
                      visibility: avatarImage ? "visible" : "hidden",
                      opacity: props.userDoc?.data()?.avatarChanging == true || uploadingAvatar == true ? "0.5" : "1.0",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      width: "30px",
                      justifyContent: "center",
                      position: "fixed",
                      visibility: props.userDoc?.data()?.avatarChanging || uploadingAvatar == true ? "visible" : "hidden",
                    }}
                  >
                    <CircularProgress size="30px" />
                  </Box>
                  <Typography sx={{ visibility: avatarImage ? "hidden" : "visible" }}>
                    {props.userDoc
                      ?.data()
                      ?.displayName?.split(" ")
                      ?.map((word) => word[0])
                      ?.join("")
                      ?.toUpperCase()}
                  </Typography>
                </Avatar>
              </ButtonBase>
            }
            action={
              <IconButton aria-label="settings">
                <IconSvgs.MoreVert sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            }
            title={props.userDoc?.data()?.displayName}
            subheader={`Joined: ${new Date(props.userDoc?.data()?.creationTime).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" })}`}
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
