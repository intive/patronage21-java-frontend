import { useRecoilState, useSetRecoilState } from "recoil";
import { userIsEditedState } from "../../../state/atoms";
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

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    maxWidth: 320,
    width: "100%",
    borderRadius: 25,
  },
}));

function UserEditButtons() {
  const [edited, setEdited] = useRecoilState(userIsEditedState);
  const updateUser = useSetRecoilState(updateUserQuery);
  const cancelEdition = useSetRecoilState(cancelUserEditionQuery);
  const classes = useStyles();

  const handleClick = (edition, functionOnClick) => (event) => {
    setEdited(edition);
    if (functionOnClick !== undefined) functionOnClick();
  };

  const itemButton = (color, buttonText, edition, functionOnClick) => (
    <Grid item xs={12} key={buttonText}>
      <Button
        className={classes.button}
        variant={"contained"}
        color={color}
        onClick={handleClick(edition, functionOnClick)}
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
              itemButton("secondary", APPROVE_BTN_TEXT, false, updateUser),
              itemButton("secondary", CANCEL_BTN_TEXT, false, cancelEdition),
            ]
          : itemButton("secondary", EDIT_PROFILE_BTN_TEXT, true)}
        {itemButton("primary", DEACTIVATE_PROFILE_BTN_TEXT, edited)}
      </Grid>
    </Grid>
  );
}

export default UserEditButtons;
