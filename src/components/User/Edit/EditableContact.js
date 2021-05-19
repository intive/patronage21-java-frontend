import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ListItem, ListItemText, TextField } from "@material-ui/core";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  USER_CONTACT_TITLE,
  USER_CONTACT_BUTTON_GITHUB,
  USER_CONTACT_BUTTON_MAIL,
  USER_CONTACT_BUTTON_PHONE,
} from "../../../config/Constants";
import GroupList from "../../UI/GroupList";

const styles = makeStyles({
  listItemView: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  button: {
    maxWidth: 200,
    width: "100%",
    marginBottom: 10,
    borderRadius: 25,
  },
});

function EditableContact() {
  const [email, setEmail] = useRecoilState(userProperty("email"));
  const [phone, setPhone] = useRecoilState(userProperty("phoneNumber"));
  const [github, setGithub] = useRecoilState(userProperty("gitHubUrl"));
  const edited = useRecoilValue(userIsEditedState);
  const classes = styles();

  const contactProperties = [
    {
      key: "email",
      value: email,
      setter: setEmail,
      type: "email",
      buttonText: USER_CONTACT_BUTTON_MAIL,
    },
    {
      key: "phone",
      value: phone,
      setter: setPhone,
      type: "number",
      buttonText: USER_CONTACT_BUTTON_PHONE,
    },
    {
      key: "github",
      value: github,
      setter: setGithub,
      type: "url",
      buttonText: USER_CONTACT_BUTTON_GITHUB,
    },
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
      <Grid container>
        <Grid item xs={12} md={7} lg={5}>
          <Button
            className={classes.button}
            variant={"contained"}
            color={"secondary"}
          >
            {property.buttonText}
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  ));

  const editableContactItems = contactProperties.map((property) => (
    <ListItem className={classes.listItemView} key={property.key}>
      <TextField
        value={property.value}
        onChange={setContactProperty(property.setter)}
        type={property.type}
      />
    </ListItem>
  ));

  return (
    <GroupList title={USER_CONTACT_TITLE}>
      {edited ? editableContactItems : contactItems}
    </GroupList>
  );
}

export default EditableContact;
