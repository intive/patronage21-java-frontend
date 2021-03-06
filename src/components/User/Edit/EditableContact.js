import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ListItem, ListItemText, TextField } from "@material-ui/core";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import Button from "../../UI/Navigation/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  USER_CONTACT_TITLE,
  USER_CONTACT_BUTTON_GITHUB,
  USER_CONTACT_BUTTON_MAIL,
  USER_CONTACT_BUTTON_PHONE,
  USER_CONTACT_EMAIL_KEY,
  USER_CONTACT_PHONE_KEY,
  USER_CONTACT_GITHUB_KEY,
} from "../../../config/Constants";
import GroupList from "../../UI/GroupList";
import styled from "styled-components";

const ListItemView = styled(ListItem)`
  padding: 16;
  flex-direction: column;
  align-items: flex-start;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const styles = makeStyles({
  listItemView: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    wordBreak: "break-all",
  },
  firstInput: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  editListItemView: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  editItemView: {
    width: "100%",
  },
  button: {
    minWidth: 150,
    marginBottom: 3,
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
      key: USER_CONTACT_EMAIL_KEY,
      value: email,
      setter: setEmail,
      type: "email",
      buttonText: USER_CONTACT_BUTTON_MAIL,
      action: `mailto:${email}`,
    },
    {
      key: USER_CONTACT_PHONE_KEY,
      value: phone,
      setter: setPhone,
      type: "number",
      buttonText: USER_CONTACT_BUTTON_PHONE,
      action: `callto://${phone}`,
    },
    {
      key: USER_CONTACT_GITHUB_KEY,
      value: github,
      setter: setGithub,
      type: "url",
      buttonText: USER_CONTACT_BUTTON_GITHUB,
      action: github,
    },
  ];

  const setContactProperty = (setMethod) => (event) => {
    setMethod(event.target.value.trim());
  };

  const getClickableLink = link => {
    return link.startsWith("http://") || link.startsWith("https://")
    ? link
    : `//${link}`;
  }

  const contactItems = contactProperties.map((property, index) => (
    <ListItemView
      divider={index !== contactProperties.length - 1}
      key={property.key}
    >
      <ListItemText primary={property.value} className={classes.listItemView} />
      <Grid container>
        <Grid item xs={12} md={7} lg={5}>
          <Button
            className={classes.button}
            variant={"contained"}
            color={"secondary"}
            target={property.key === USER_CONTACT_GITHUB_KEY ? "_blank" : null}
            href={property.key === USER_CONTACT_GITHUB_KEY ? getClickableLink(property.action) : property.action}
            disabled={property.value === null}
          >
            {property.buttonText}
          </Button>
        </Grid>
      </Grid>
    </ListItemView>
  ));

  const editableContactItems = contactProperties.map((property) => (
    <ListItemView key={property.key} className={USER_CONTACT_EMAIL_KEY === property.key ? classes.firstInput : classes.editListItemView}>
      <TextField
        value={property.value}
        variant={"outlined"}
        label={property.key}
        onChange={setContactProperty(property.setter)}
        type={property.type}
        className={classes.editItemView}
        multiline
      />
    </ListItemView>
  ));

  return (
    <GroupList title={USER_CONTACT_TITLE}>
      {edited ? editableContactItems : contactItems}
    </GroupList>
  );
}

export default EditableContact;
