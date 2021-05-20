import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userIsEditedState, currentUserState } from "../../../state/atoms";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  APPROVE_BTN_TEXT,
  EDIT_PROFILE_BTN_TEXT,
  DEACTIVATE_PROFILE_BTN_TEXT,
  CANCEL_BTN_TEXT,
} from "../../../config/Constants";
import {
  updateUserQuery,
  cancelUserEditionQuery,
} from "../../../state/selectors";
import { deactivateUserByLogin } from "../../../client/client";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    maxWidth: 320,
    width: "100%",
    borderRadius: 25,
  },
}));

function UserEditButtons() {
  const classes = useStyles();
  const [edited, setEdited] = useRecoilState(userIsEditedState);
  const updateUser = useSetRecoilState(updateUserQuery);
  const cancelEdition = useSetRecoilState(cancelUserEditionQuery);
  const currentUser = useRecoilValue(currentUserState);

  const deactivate = () => deactivateUserByLogin(currentUser.login);
  const enableEdition = () => setEdited(true);

  const confirmUpdate = () => {
    updateUser();
    setEdited(false);
  };

  const itemButton = (color, buttonText, functionOnClick) => (
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
        {edited
          ? [
              itemButton("secondary", APPROVE_BTN_TEXT, confirmUpdate),
              itemButton("secondary", CANCEL_BTN_TEXT, cancelEdition),
            ]
          : itemButton("secondary", EDIT_PROFILE_BTN_TEXT, enableEdition)}
        {itemButton("primary", DEACTIVATE_PROFILE_BTN_TEXT, deactivate)}
      </Grid>
    </Grid>
  );
}

export default UserEditButtons;
