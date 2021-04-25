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
  canselUserEditionQuery,
} from "../../../state/selectors";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    maxWidth: 320,
    width: "100%",
  },
}));

function UserEditButtons() {
  const [edited, setEdited] = useRecoilState(userIsEditedState);
  const updateUser = useSetRecoilState(updateUserQuery);
  const canselUserEdition = useSetRecoilState(canselUserEditionQuery);
  const classes = useStyles();

  function editUser() {
    setEdited(!edited);
    updateUser();
  }

  function cancelEdition() {
    setEdited(false);
    canselUserEdition();
  }

  const itemButton = (color, buttonText, functionOnClick, functionParam) => (
    <Grid item xs={12} key={buttonText}>
      <Button
        className={classes.button}
        variant={"contained"}
        color={color}
        onClick={(event) => functionOnClick(functionParam)}
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
              itemButton("secondary", APPROVE_BTN_TEXT, editUser),
              itemButton("secondary", CANCEL_BTN_TEXT, cancelEdition),
            ]
          : itemButton("secondary", EDIT_PROFILE_BTN_TEXT, setEdited, !edited)}
        {itemButton("primary", DEACTIVATE_PROFILE_BTN_TEXT, () => void 0)}
      </Grid>
    </Grid>
  );
}

export default UserEditButtons;
