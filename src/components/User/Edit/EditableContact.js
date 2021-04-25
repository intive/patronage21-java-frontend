import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ListItem, ListItemText, TextField } from "@material-ui/core";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { makeStyles } from "@material-ui/core/styles";
import { USER_CONTACT_TITLE } from "../../../config/Constants";
import ListGroup from "../ListGroup";

const styles = makeStyles({
  listItemView: {
    padding: 16,
  },
});

function EditableContact() {
  const [email, setEmail] = useRecoilState(userProperty("email"));
  const [phone, setPhone] = useRecoilState(userProperty("phone"));
  const [github, setGithub] = useRecoilState(userProperty("github"));
  const edited = useRecoilValue(userIsEditedState);
  const classes = styles();

  const contactProperties = [
    { name: email, setter: setEmail },
    { name: phone, setter: setPhone },
    { name: github, setter: setGithub },
  ];

  const contactItems = contactProperties.map((property, index) => (
    <ListItem
      divider={index !== contactProperties.length - 1}
      className={classes.listItemView}
      key={index}
    >
      <ListItemText primary={property.name} />
    </ListItem>
  ));

  const editableContactItems = contactProperties.map((property, index) => (
    <ListItem className={classes.listItemView} key={index}>
      <TextField
        value={property.name}
        primary={property.name}
        onChange={(event) => property.setter(event.target.value)}
      />
    </ListItem>
  ));

  return (
    <ListGroup groupTitle={USER_CONTACT_TITLE}>
      {edited ? editableContactItems : contactItems}
    </ListGroup>
  );
}

export default EditableContact;
