import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";
import * as React from "react";

function CreateServerDialog(props) {
  const theme = useTheme();
  const functions = getFunctions();
  connectFunctionsEmulator(functions, "localhost", 5001);
  const addServerNew = httpsCallable(functions, "addServerNew");

  const [serverName, setServerName] = React.useState("");
  const [serverDescription, setServerDescription] = React.useState("");
  const [serverSubject, setServerSubject] = React.useState("");

  const addServer = () => {
    addServerNew({ name: serverName, description: serverDescription, subject: serverSubject }).then((result) => {
      const data = result.data; // Includes IDs of the created server and channel
      console.log(data);
    });
  };

  return (
    <Dialog
      open={props.createServerDialogOpen}
      onClose={() => {
        props.setCreateServerDialogOpen(false);
      }}
    >
      <DialogTitle>Create a New Server</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Fill out some basic details.</DialogContentText>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField autoFocus margin="dense" label="Display Name" type="text" variant="outlined" onChange={(event) => setServerName(event.target.value)} />
          <TextField margin="dense" label="Description" type="text" variant="outlined" onChange={(event) => setServerDescription(event.target.value)} />
          <TextField margin="dense" label="Subject" type="text" variant="outlined" onChange={(event) => setServerSubject(event.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained" onClick={() => addServer()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateServerDialog;
