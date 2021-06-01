import { useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  userIsEditedState,
  currentUserState,
  alertFrameVisibleState,
  userProperty,
} from "../../../state/atoms";
import {
  setCurrentUserState,
  cancelUserEdition,
  setLastResponseState,
} from "../../../state/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
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
    color: "white",
    maxWidth: 320,
    width: "100%",
    borderRadius: 25,
  },
}));

function UserEditButtons() {
  const classes = useStyles();
  const cancelEdition = useSetRecoilState(cancelUserEdition);
  const currentUser = useRecoilValue(currentUserState);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [edited, setEdited] = useRecoilState(userIsEditedState);
  const setCurrentUser = useSetRecoilState(setCurrentUserState);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setAlertFrameVisibleState = useSetRecoilState(alertFrameVisibleState);
  const setEditionAlerts = useSetRecoilState(checkEditionAlerts);
  const prevCurrentUserRef = useRef();
  const prevCurrentUser = prevCurrentUserRef.current;
  const [status, setStatus] = useRecoilState(userProperty("status"));

  useEffect(() => (prevCurrentUserRef.current = { ...currentUser }));
  const deactivate = () => {
    deactivateUserByLogin(currentUser.login);
    cancelEdition();
    setStatus(USER_INACTIVE_STATUS);
  };

  const confirmUpdate = () => {
    setCurrentUser();
    setUpdateBtnClicked(true);
  };

  const enableEdition = () => {
    setEdited(true);
    setAlertFrameVisibleState(false);
  };

  const isUserDataUpdated = useCallback(() => {
    let userDataUpdated = false;
    if (currentUser && prevCurrentUser) {
      userDataUpdated = Object.keys(currentUser).some((key) => {
        if (key === "image") return false;
        return currentUser[key] !== prevCurrentUser[key];
      });
    }
    return userDataUpdated;
  }, [currentUser, prevCurrentUser]);

  const sendUserIfUpdated = useCallback(async () => {
    if (isUserDataUpdated()) {
      const response = await updateUser(currentUser);
      setResponse(response);
    } else {
      setResponse({ status: "sameData", body: "" });
    }
  }, [currentUser, setResponse, isUserDataUpdated]);

  useEffect(
    () => async () => {
      if (updateBtnClicked) {
        await sendUserIfUpdated();
        setEditionAlerts("edition");
        setUpdateBtnClicked(false);
      }
    },
    [updateBtnClicked, sendUserIfUpdated, setEditionAlerts]
  );

  const itemButton = (color, buttonText, functionOnClick) => (
    <Grid item xs={12} key={buttonText}>
      <Button
        className={classes.button}
        variant={"contained"}
        color={color}
        onClick={functionOnClick}
        disabled={status === USER_INACTIVE_STATUS}
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
        {status !== USER_INACTIVE_STATUS &&
          itemButton("primary", DEACTIVATE_PROFILE_BTN_TEXT, deactivate)}
      </Grid>
    </Grid>
  );
}

export default UserEditButtons;
