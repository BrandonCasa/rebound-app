import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

function ServerDialog(props) {
  const theme = useTheme();

  return (
    <Dialog
      open={props.serverDialogOpen}
      onClose={() => {
        props.setServerDialogOpen(false);
      }}
    >
      <DialogTitle>Create or Join a Server</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Choose whether to join or make a new server.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setServerDialogOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            props.setServerDialogOpen(false);
            props.setCreateServerDialogOpen(true);
          }}
        >
          Create
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            props.setServerDialogOpen(false);
            props.setJoinServerDialogOpen(true);
          }}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServerDialog;
