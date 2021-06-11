import React from "react";
import Button from "./Navigation/Button";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DIALOG_CANCEL_BTN_TEXT,
  DIALOG_AGREE_BTN_TEXT,
} from "../../config/Constants";

export const StyledButton = styled(Button)`
  width: 130px;
  margin: auto;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 20px;
`;

function ConfirmationDialog(props) {
  const setConfirmed = (confirmed) => () => props.confirm(confirmed);

  return (
    <Dialog open={props.open} onClose={setConfirmed(false)}>
      <DialogTitle>{props.title}</DialogTitle>
      <StyledDialogActions>
        <StyledButton
          onClick={setConfirmed(false)}
          color="primary"
          variant="contained"
        >
          {DIALOG_CANCEL_BTN_TEXT}
        </StyledButton>
        <StyledButton
          onClick={setConfirmed(true)}
          color="secondary"
          autoFocus
          variant="contained"
        >
          {DIALOG_AGREE_BTN_TEXT}
        </StyledButton>
      </StyledDialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
