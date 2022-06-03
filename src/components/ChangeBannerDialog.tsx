import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { closeDialog, dialogsSelector } from "../redux/Dialogs/dialogs.slice";
import { useAppDispatch } from "../redux/store";
import { auth, functions, storage } from "../server/index";
import { doc, getDoc } from "firebase/firestore";
import { refreshBanner, setBanner, userstuffSelector } from "../redux/Userstuff/userstuff.slice";
import { useFilePicker } from "use-file-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ChangeBannerDialog(props: any) {
  const dialogsState = useSelector(dialogsSelector);
  const dispatch = useAppDispatch();
  const userState = useSelector(userstuffSelector);

  const [bannerPic, setBannerPic] = React.useState<undefined | string>(undefined);

  const changeBanner = () => {
    //Upload image
    const userBannerRef = ref(storage, `users/${auth.currentUser?.uid}/banner/userBanner.png`);
    fetch(`${bannerPic}`)
      .then((res) => res.blob())
      .then((blob) => {
        uploadBytes(userBannerRef, blob)
          .then((snapshot) => {
            console.log("Uploaded a blob or file!");
          })
          .then(() => {
            fetch(`${functions.customDomain}/changeBanner`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              mode: "no-cors",
              body: JSON.stringify({ hasBanner: true, auth: auth }),
            });
            dispatch(refreshBanner());
          });
      });
    dispatch(closeDialog("changeDisplayNameDialog"));
  };

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 10,
    imageSizeRestrictions: {
      maxHeight: 1024,
      maxWidth: 1024,
      minHeight: 32,
      minWidth: 32,
    },
  });

  React.useEffect(() => {
    if (filesContent.length > 0) {
      setBannerPic(filesContent[0].content);
    } else {
      setBannerPic(userState.banner);
    }
  }, [filesContent]);

  React.useEffect(() => {
    setBannerPic(userState.banner);
  }, [userState.banner]);

  return (
    <Dialog
      open={dialogsState.openedDialogs.includes("changeBannerDialog")}
      onClose={() => {
        setBannerPic(userState.banner);
        dispatch(closeDialog("changeBannerDialog"));
      }}
    >
      <DialogTitle>Change Your Banner</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Choose the gif or image file for your new banner.</DialogContentText>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ width: "298px", height: "172px" }} alt="lol" onClick={() => openFileSelector()} src={bannerPic} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setBannerPic(userState.banner);
            dispatch(closeDialog("changeBannerDialog"));
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => changeBanner()}>
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeBannerDialog;
