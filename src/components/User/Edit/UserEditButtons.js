import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  APPROVE_BTN_TEXT,
  EDIT_PROFILE_BTN_TEXT,
  DEACTIVATE_PROFILE_BTN_TEXT,
  CANCEL_BTN_TEXT,
} from "../../../config/Constants";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    maxWidth: 320,
    width: "100%",
  },
}));

function UserEditButtons(props) {
  const classes = useStyles();

  function editUser() {
    props.onToggleEditMode();
    props.saveUserState();
  }

  const itemButton = (color, functionOnClick, buttonText) => (
    <Grid item xs={12} key={buttonText}>
      <Button
        className={classes.button}
        variant={"contained"}
        color={color}
        onClick={functionOnClick}
      >
        {buttonText}
      </Button>
    </Grid>
  );

  return (
    <Grid item xs={12}>
      <Grid container spacing={2} direction={"column"}>
        {props.edit
          ? [
              itemButton("secondary", props.onToggleEditMode, APPROVE_BTN_TEXT),
              itemButton("secondary", props.cancelUserEdit, CANCEL_BTN_TEXT),
            ]
          : itemButton("secondary", editUser, EDIT_PROFILE_BTN_TEXT)}
        {itemButton("primary", () => void 0, DEACTIVATE_PROFILE_BTN_TEXT)}
      </Grid>
    </Grid>
  );
}

UserEditButtons.propTypes = {
  edit: PropTypes.bool.isRequired,
  onToggleEditMode: PropTypes.func.isRequired,
  saveUserState: PropTypes.func.isRequired,
  cancelUserEdit: PropTypes.func.isRequired,
};

export default UserEditButtons;
