import { ListItem, ListItemText, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { USER_CONTACT_TITLE } from "../../../config/Constants";
import ListGroup from "../ListGroup";

const styles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.primary,
  },
  listItemView: {
    padding: 16,
  },
}));

function EditableContact(props) {
  const classes = styles();

  function handleOnChange(event, propertyName) {
    const { value } = event.target;
    let userToUpdate = Object.assign({}, props.user);
    userToUpdate[propertyName] = value;
    props.setUser(userToUpdate);
  }

  const contactProperties = ["email", "phone", "github"];

  const contactItems = contactProperties.map((property, index) => (
    <ListItem
      divider={index !== contactProperties.length - 1}
      className={classes.listItemView}
      key={property}
    >
      <ListItemText primary={props.user[property]} />
    </ListItem>
  ));

  const editableContactItems = contactProperties.map((property) => (
    <ListItem className={classes.listItemView} key={property}>
      <TextField
        value={props.user[property]}
        className={classes.text}
        primary={props.user[property]}
        onChange={(event) => handleOnChange(event, property)}
      />
    </ListItem>
  ));

  return (
    <ListGroup groupTitle={USER_CONTACT_TITLE}>
      {props.edit ? editableContactItems : contactItems}
    </ListGroup>
  );
}

EditableContact.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default EditableContact;
