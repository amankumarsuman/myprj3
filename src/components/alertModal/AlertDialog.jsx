import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { dangerStyles, normalStyles } from "./style";

import { useSelector } from "react-redux";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AlertDialog = () => {
  const dialogConfirmationDetails = useSelector((state) => state.alertDialog);
  const {
    alertType,
    alertTitle,
    alertMessage,
    onAgree,
    onDisagree,
    displayError,
    isOpen,
  } = dialogConfirmationDetails;

  const danger = dangerStyles();
  const normal = normalStyles();

  const selectStyle = () => {
    switch (alertType) {
      case "danger":
        return danger;
      default:
        return normal;
    }
  };

  return isOpen ? (
    <Dialog
      open={true}
      // TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      className={selectStyle()?.body}
    >
      <DialogTitle className={selectStyle()?.title}>{alertTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText className={selectStyle()?.message}>
          {alertMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {displayError ? (
          <Button variant="outlined" onClick={onAgree}>
            Ok
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={onDisagree}>
              Disagree
            </Button>
            <Button variant="contained" onClick={onAgree}>
              Agree
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  ) : null;
};
