import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { closeDialog, dialogsSelector } from "../redux/Dialogs/dialogs.slice";
import { useAppDispatch } from "../redux/store";
import { auth, functions } from "../server/index";
import { doc, getDoc } from "firebase/firestore";
import { userstuffSelector } from "../redux/Userstuff/userstuff.slice";

function ChangeDisplayNameDialog(props: any) {
  const dialogsState = useSelector(dialogsSelector);
  const dispatch = useAppDispatch();
  const userState = useSelector(userstuffSelector);

  const [newDisplayName, setNewDisplayName] = React.useState("");

  const changeDisplayName = () => {
    fetch(`${functions.customDomain}/changeDisplayName`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
      body: JSON.stringify({ newDisplayName: newDisplayName, auth: auth }),
    });
    dispatch(closeDialog("changeDisplayNameDialog"));
  };

  React.useEffect(() => {
    setNewDisplayName(userState.displayName);
  }, [userState.displayName]);

  return (
    <Dialog
      open={dialogsState.openedDialogs.includes("changeDisplayNameDialog")}
      onClose={() => {
        setNewDisplayName(userState.displayName);
        dispatch(closeDialog("changeDisplayNameDialog"));
      }}
    >
      <DialogTitle>Change Your Display Name</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Input the new display name you would like to use.</DialogContentText>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField autoFocus margin="dense" label="New Display Name" type="text" variant="outlined" onChange={(event) => setNewDisplayName(event.target.value)} value={newDisplayName} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewDisplayName(userState.displayName);
            dispatch(closeDialog("changeDisplayNameDialog"));
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => changeDisplayName()}>
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeDisplayNameDialog;
