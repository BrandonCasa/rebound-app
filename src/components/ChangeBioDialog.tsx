import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { closeDialog, dialogsSelector } from "../redux/Dialogs/dialogs.slice";
import { useAppDispatch } from "../redux/store";
import { auth, functions } from "../server/index";
import { doc, getDoc } from "firebase/firestore";
import { userstuffSelector } from "../redux/Userstuff/userstuff.slice";

function ChangeBioDialog(props: any) {
  const dialogsState = useSelector(dialogsSelector);
  const dispatch = useAppDispatch();
  const userState = useSelector(userstuffSelector);

  const [newBio, setNewBio] = React.useState("");

  const changeBio = () => {
    fetch(`${functions.customDomain}/changeBio`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
      body: JSON.stringify({ newBio: newBio, auth: auth }),
    });
    dispatch(closeDialog("changeBioDialog"));
  };

  React.useEffect(() => {
    setNewBio(userState.bio);
  }, [userState.bio]);

  return (
    <Dialog
      open={dialogsState.openedDialogs.includes("changeBioDialog")}
      onClose={() => {
        setNewBio(userState.bio);
        dispatch(closeDialog("changeBioDialog"));
      }}
    >
      <DialogTitle>Change Your Bio</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Input the new bio you would like to use.</DialogContentText>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField autoFocus margin="dense" label="New Bio" type="text" variant="outlined" onChange={(event) => setNewBio(event.target.value)} value={newBio} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewBio(userState.bio);
            dispatch(closeDialog("changeBioDialog"));
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => changeBio()}>
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeBioDialog;
