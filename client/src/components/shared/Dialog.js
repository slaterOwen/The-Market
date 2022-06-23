import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const MyDialog = (props) => {
  const {
    title,
    onClose,
    onAccept,
    content,
    buttonText = "Okay",
    closeButtonText = "Cancel",
    open,
  } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="dialog" open={open}>
      {!!title && (
        <DialogTitle id={`dialog-title-${title}`}>{title}</DialogTitle>
      )}
      {!!content && (
        <DialogContent>
          <DialogContentText id={`dialog-text-${title}`}>
            {content}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {!!closeButtonText && (
          <Button onClick={onClose}>{closeButtonText}</Button>
        )}
        {!!buttonText && (
          <Button onClick={onAccept} autoFocus>
            {buttonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
