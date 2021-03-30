import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Information from "../../UI/Information";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    wordBreak: "break-all",
  },
}));

function EditableInformation(props) {
  const classes = useStyles();

  function handleOnChange(event) {
    const { value } = event.target;
    let userToUpdate = Object.assign({}, props.user);
    userToUpdate.bio = value;
    props.setUser(userToUpdate);
  }

  const editableBioInfo = () => (
    <Box py={2}>
      <TextField
        className={classes.text}
        value={props.user.bio}
        primary={props.user.bio}
        onChange={(event) => handleOnChange(event)}
      />
    </Box>
  );

  return (
    <>
      {props.edit ? (
        editableBioInfo()
      ) : (
        <Information info={props.user.bio} class={classes.text} />
      )}
    </>
  );
}

EditableInformation.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default EditableInformation;
