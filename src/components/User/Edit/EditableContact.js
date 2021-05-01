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
  const [phone, setPhone] = useRecoilState(userProperty("phoneNumber"));
  const [github, setGithub] = useRecoilState(userProperty("gitHubUrl"));
  const edited = useRecoilValue(userIsEditedState);
  const classes = styles();

  const contactProperties = [
    { key: "email", value: email, setter: setEmail },
    { key: "phone", value: phone, setter: setPhone },
    { key: "github", value: github, setter: setGithub },
  ];

  const setContactProperty = (setMethod) => (event) => {
    setMethod(event.target.value);
  };

  const contactItems = contactProperties.map((property, index) => (
    <ListItem
      divider={index !== contactProperties.length - 1}
      className={classes.listItemView}
      key={property.key}
    >
      <ListItemText primary={property.value} />
    </ListItem>
  ));

  const editableContactItems = contactProperties.map((property) => (
    <ListItem className={classes.listItemView} key={property.key}>
      <TextField
        value={property.value}
        onChange={setContactProperty(property.setter)}
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
