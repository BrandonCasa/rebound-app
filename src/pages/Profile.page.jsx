import * as IconSvgs from "@mui/icons-material";
import { TextField, Box, Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Paper, Typography, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, UserContext } from "../helpers/usersContext";
import { getStorage, ref, getBlob, listAll } from "firebase/storage";
import { getFunctions, httpsCallable, HttpsCallableOptions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { useRef } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CryptoJS from "crypto-js";
import { getApp } from "firebase/app";
import userBannerBase from "../userBanner.png";
import { useState } from "react";

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

function UserProfilePage(props) {
  const [userAuth, userAuthLoading, userAuthError] = useContext(AuthContext);
  const [userDoc, userDocLoading, userDocError] = useContext(UserContext);

  let params = useParams();
  let theme = useTheme();

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const [bannerImage, setBannerImage] = React.useState(undefined);
  const [avatarImage, setAvatarImage] = React.useState(undefined);
  const [uploadingBanner, setUploadingBanner] = React.useState(false);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);
  const [displayNameLocal, setDisplayNameLocal] = React.useState(props.otherDoc?.displayName || "");
  const [userBioLocal, setUserBioLocal] = React.useState(props.otherDoc?.bio || "");

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
        bannerInputRef.current.value = "";
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
        avatarInputRef.current.value = "";
      };
    }
  };

  React.useEffect(() => {
    const storage = getStorage();

    // Banner
    if (props.otherDoc?.bannerChanging == false) {
      // If the banner is not changing, show the banner
      if (props.otherDoc?.bannerName == undefined || props.otherDoc?.bannerName == null) {
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
          if (bannerFileName == props.otherDoc?.bannerName) {
            // If the banner is the same as the stored banner, do not update the banner
            return;
          }
        }
        const pathReference = ref(storage, `users/${params.id}/banner/${props.otherDoc?.bannerName}`);
        getBlob(pathReference, undefined)
          .then((blob) => {
            setBannerImage(URL.createObjectURL(blob));
            //console.log("banner updated");
            //console.log(blob);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [props.otherDoc?.bannerName, props.otherDoc?.bannerChanging]);

  React.useEffect(() => {
    setDisplayNameLocal(props.otherDoc?.displayName || "");
  }, [props.otherDoc?.displayName]);

  React.useEffect(() => {
    setUserBioLocal(props.otherDoc?.bio || "");
  }, [props.otherDoc?.bio]);

  React.useEffect(() => {
    const storage = getStorage();

    // Avatar
    if (props.otherDoc?.avatarChanging == false) {
      // If the avatar is not changing, show the avatar
      if (props.otherDoc?.avatarName == undefined || props.otherDoc?.avatarName == null) {
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
          if (avatarFileName == props.otherDoc?.avatarName) {
            // If the avatar is the same as the stored avatar, do not update the avatar
            return;
          }
        }
        const pathReference = ref(storage, `users/${params.id}/avatar/${props.otherDoc?.avatarName}`);
        getBlob(pathReference, undefined)
          .then((blob) => {
            setAvatarImage(URL.createObjectURL(blob));
            //console.log("avatar updated");
            //console.log(blob);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [props.otherDoc?.avatarName, props.otherDoc?.avatarChanging]);

  let canEditBanner = userDoc?.uid === params.id && (props.otherDoc?.bannerChanging == false || props.otherDoc?.bannerChanging == undefined) && uploadingBanner == false;
  let canEditAvatar = userDoc?.uid === params.id && (props.otherDoc?.avatarChanging == false || props.otherDoc?.avatarChanging == undefined) && uploadingAvatar == false;
  let canEditName = userDoc?.uid === params.id;
  let canEditBio = userDoc?.uid === params.id;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, width: "100%", height: "100%" }}>
      <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeBannerFile} />
      <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onChangeAvatarFile} />
      <Stack direction="column" alignItems="center" spacing={2} sx={{ display: "flex", width: "100%", flexGrow: 1, justifyContent: "start" }}>
        <Box>
          <CustomCard>
            <Fragment>
              <CardMedia
                component="img"
                image={bannerImage}
                alt={"Error loading banner"}
                style={{
                  margin: "-8px",
                  height: "75px",
                  width: "345px",
                  outline: "none",
                  border: "none",
                  visibility: bannerImage ? "visible" : "hidden",
                  opacity: props.otherDoc?.bannerChanging == true || uploadingBanner == true ? "0.5" : "1.0",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  marginTop: "-75px",
                  width: "auto",
                  height: "75px",
                  justifyContent: "center",
                  visibility: props.otherDoc?.bannerChanging || uploadingBanner == true ? "visible" : "hidden",
                }}
              >
                <CircularProgress sx={{ margin: "5.5px" }} size="64px" />
              </Box>
            </Fragment>
            <CardHeader
              sx={{ marginTop: "8px" }}
              avatar={
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
                      opacity: props.otherDoc?.avatarChanging == true || uploadingAvatar == true ? "0.5" : "1.0",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      width: "30px",
                      justifyContent: "center",
                      position: "fixed",
                      visibility: props.otherDoc?.avatarChanging || uploadingAvatar == true ? "visible" : "hidden",
                    }}
                  >
                    <CircularProgress size="30px" />
                  </Box>
                  <Typography sx={{ visibility: avatarImage ? "hidden" : "visible" }}>
                    {props.otherDoc?.displayName
                      ?.split(" ")
                      ?.map((word) => word[0])
                      ?.join("")
                      ?.toUpperCase()}
                  </Typography>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <IconSvgs.MoreVert sx={{ color: theme.palette.text.primary }} />
                </IconButton>
              }
              title={props.otherDoc?.displayName}
              subheader={`Joined: ${new Date(props.otherDoc?.creationTime).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" })}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {props.otherDoc?.bio}
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
        </Box>
        <Item sx={{ flexDirection: "column", gap: 1, width: "50%", minWidth: "fit-content", display: userDoc?.uid === params.id ? "flex" : "none" }}>
          <Button
            disabled={!canEditBanner}
            variant="contained"
            sx={{ marginRight: "auto", height: "40px", width: "35%", minWidth: "fit-content" }}
            color="secondary"
            startIcon={<IconSvgs.Image />}
            onClick={() => bannerInputRef.current && bannerInputRef.current.click()}
          >
            Edit Banner
          </Button>
          <Box
            sx={{
              marginRight: "auto",
              height: "40px",
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              disabled={!canEditName}
              variant="contained"
              sx={{
                minWidth: 0,
                marginRight: "8px",
                height: "40px",
                ".MuiButton-startIcon": {
                  marginRight: "0px",
                },
              }}
              color="secondary"
              startIcon={<IconSvgs.Edit />}
              onClick={() => {
                let functions = getFunctions(getApp(), "us-central1");
                const auth = getAuth();
                const changeDisplayName = httpsCallable(functions, "changeDisplayName", {});
                changeDisplayName({ newDisplayName: displayNameLocal }).then((result) => {
                  const data = result.data;
                  //console.log(data);
                });
              }}
            />
            <TextField
              sx={{ width: "100%" }}
              disabled={!canEditName}
              onChange={(event) => setDisplayNameLocal(event.target.value)}
              value={displayNameLocal}
              label="Nickname"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box
            sx={{
              marginRight: "auto",
              height: "86px",
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              disabled={!canEditBio}
              variant="contained"
              sx={{
                minWidth: 0,
                marginRight: "8px",
                height: "86px",
                ".MuiButton-startIcon": {
                  marginRight: "0px",
                },
              }}
              color="secondary"
              startIcon={<IconSvgs.Edit />}
              onClick={() => {
                let functions = getFunctions(getApp(), "us-central1");
                const auth = getAuth();
                const changeBio = httpsCallable(functions, "changeBio", {});
                changeBio({ newBio: userBioLocal }).then((result) => {
                  const data = result.data;
                  //console.log(data);
                });
              }}
            />
            <TextField
              sx={{ width: "100%" }}
              multiline
              rows={3}
              disabled={!canEditBio}
              onChange={(event) => setUserBioLocal(event.target.value)}
              value={userBioLocal}
              label="About Me"
              variant="outlined"
              size="small"
            />
          </Box>
          <Button
            disabled={!canEditAvatar}
            variant="contained"
            sx={{ marginRight: "auto", height: "40px", width: "35%", minWidth: "fit-content" }}
            color="secondary"
            startIcon={<IconSvgs.Face />}
            onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
          >
            Edit Avatar
          </Button>
        </Item>
      </Stack>
    </Box>
  );
}

function ProfilePage(props) {
  let params = useParams();
  const [userAuth, userAuthLoading, userAuthError] = useContext(AuthContext);
  const [otherDoc, setOtherDoc] = useState(undefined);
  const [otherDocLoading, setOtherDocLoading] = useState(true);

  // Update the otherDoc for the currently viewed profile
  React.useEffect(() => {
    setOtherDoc(undefined);
    setOtherDocLoading(true);
    const db = getFirestore();
    const docRef = doc(db, "users", params.id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setOtherDoc(doc.data());
      setOtherDocLoading(false);
    });
    return unsubscribe;
  }, [userAuth?.uid, params.id]);

  if (userAuthLoading || otherDocLoading) {
    return (
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <CircularProgress size={120} />
      </Box>
    );
  }
  if (userAuthError) {
    return "Error";
  }
  return <UserProfilePage otherDoc={otherDoc} otherDocLoading={otherDocLoading} />;
}

export default ProfilePage;
