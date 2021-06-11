import { useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  userIsEditedState,
  currentUserState,
  alertFrameVisibleState,
  userProperty,
} from "../../../state/atoms";
import {
  cancelUserEdition,
  setLastResponseState,
  isUserDataChanged,
  getEditionTempUser,
} from "../../../state/selectors";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../UI/Navigation/Button";
import Grid from "@material-ui/core/Grid";
import {
  APPROVE_BTN_TEXT,
  EDIT_PROFILE_BTN_TEXT,
  DEACTIVATE_PROFILE_BTN_TEXT,
  CANCEL_BTN_TEXT,
  USER_INACTIVE_STATUS,
} from "../../../config/Constants";
import { deactivateUserByLogin, updateUser } from "../../../client/client";
import { checkEditionAlerts } from "../../../alerts/alertSelectors";

const useStyles = makeStyles(() => ({
  button: {
    maxWidth: 320,
    width: "100%",
  },
}));

function UserEditButtons() {
  const classes = useStyles();
  const cancelEdition = useSetRecoilState(cancelUserEdition);
  const currentUser = useRecoilValue(currentUserState);
  const [edited, setEdited] = useRecoilState(userIsEditedState);
  const updated = useRecoilValue(isUserDataChanged);
  const editionTempUser = useRecoilValue(getEditionTempUser);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setAlertFrameVisibleState = useSetRecoilState(alertFrameVisibleState);
  const setEditionAlerts = useSetRecoilState(checkEditionAlerts);
  const [status, setStatus] = useRecoilState(userProperty("status"));

  useEffect(() => {
    if (edited && !updated) {
      setAlertFrameVisibleState(false);
    }
  }, [updated, edited, setAlertFrameVisibleState]);

  const deactivate = () => {
    deactivateUserByLogin(currentUser.login);
    cancelEdition();
    setStatus(USER_INACTIVE_STATUS);
  };

  const confirmUpdate = async () => {
    await sendUserIfUpdated();
    setEditionAlerts("edition");
  };

  const enableEdition = () => {
    setEdited(true);
    setAlertFrameVisibleState(false);
  };

  const sendUserIfUpdated = async () => {
    if (updated) {
      const response = await updateUser(editionTempUser);
      setResponse(response);
    } else {
      setResponse({ status: "sameData", body: "" });
    }
  };

  const button = (color, buttonText, functionOnClick, disabled) => (
    <Grid item xs={12} key={buttonText}>
      <Button
        className={classes.button}
        variant={"contained"}
        color={color}
        onClick={functionOnClick}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </Grid>
  );

  const inactive = status === USER_INACTIVE_STATUS;
  return (
    <Grid item xs={12}>
      <Grid container spacing={2} direction={"column"}>
        {edited
          ? [
              button("secondary", APPROVE_BTN_TEXT, confirmUpdate, !updated),
              button("secondary", CANCEL_BTN_TEXT, cancelEdition, false),
            ]
          : button("secondary", EDIT_PROFILE_BTN_TEXT, enableEdition, inactive)}
        {status !== USER_INACTIVE_STATUS &&
          button("primary", DEACTIVATE_PROFILE_BTN_TEXT, deactivate, false)}
      </Grid>
    </Grid>
  );
}

export default UserEditButtons;
