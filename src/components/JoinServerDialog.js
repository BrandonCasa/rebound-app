import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "redux/Dialogs/dialogs.slice";
import { auth, functions } from "../server/index";

function JoinServerDialog(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [joinCode, setJoinCode] = React.useState("");
  const dialogOpen = useSelector((state) => state.dialogs.openedDialogs.includes("joinServerDialog"));

  const joinServer = () => {
    fetch(`${functions.customDomain}/joinServer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
      body: JSON.stringify({ serverID: joinCode, auth: auth }),
    });
    dispatch(closeDialog("joinServerDialog"));
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => {
        dispatch(closeDialog("joinServerDialog"));
      }}
    >
      <DialogTitle>Join an existing Server</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Paste the join code below of an existing server.</DialogContentText>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField autoFocus margin="dense" label="Join Code" type="text" variant="outlined" onChange={(event) => setJoinCode(event.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeDialog("joinServerDialog"))}>Cancel</Button>
        <Button variant="contained" onClick={() => joinServer()}>
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JoinServerDialog;
