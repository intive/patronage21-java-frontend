import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import UserHeader from "../UserHeader";

function EditableUserHeader(props) {
  function handleOnChange(event, propertyName) {
    const { value } = event.target;
    let userToUpdate = Object.assign({}, props.user);
    userToUpdate[propertyName] = value;
    props.setUser(userToUpdate);
  }

  const item = (propertyName) => (
    <TextField
      value={props.user[propertyName]}
      primary={props.user[propertyName]}
      onChange={(event) => handleOnChange(event, propertyName)}
    />
  );

  return (
    <UserHeader
      firstName={props.edit ? item("firstName") : props.user.firstName}
      lastName={props.edit ? item("lastName") : props.user.lastName}
      alignItems={props.edit ? "baseline" : "center"}
    />
  );
}

EditableUserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default EditableUserHeader;
