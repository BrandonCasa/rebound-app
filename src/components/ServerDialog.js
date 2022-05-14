// @ts-nocheck
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, openDialog } from "../redux/Dialogs/dialogs.slice";

function ServerDialog(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const dialogOpen = useSelector((state) => state.dialogs.openedDialogs.includes("serverDialog"));

  return (
    <Dialog open={dialogOpen} onClose={() => dispatch(closeDialog("serverDialog"))}>
      <DialogTitle>Create or Join a Server</DialogTitle>
      <DialogContent sx={{ width: "500px", maxWidth: "75vw" }}>
        <DialogContentText>Choose whether to join or make a new server.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeDialog("serverDialog"))}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(closeDialog("serverDialog"));
            dispatch(openDialog("createServerDialog"));
          }}
        >
          Create
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(closeDialog("serverDialog"));
            dispatch(openDialog("joinServerDialog"));
          }}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServerDialog;
