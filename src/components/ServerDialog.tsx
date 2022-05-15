import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { closeDialog, dialogsSelector, openDialog } from "../redux/Dialogs/dialogs.slice";
import { useAppDispatch } from "../redux/store";

function ServerDialog(props: any) {
  const dialogsState = useSelector(dialogsSelector);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={dialogsState.openedDialogs.includes("serverDialog")} onClose={() => dispatch(closeDialog("serverDialog"))}>
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
