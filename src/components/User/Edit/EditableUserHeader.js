import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { TextField } from "@material-ui/core";
import UserHeader from "../UserHeader";

function EditableUserHeader() {
  const edited = useRecoilValue(userIsEditedState);
  const [firstName, setFirstName] = useRecoilState(userProperty("firstName"));
  const [lastName, setLastName] = useRecoilState(userProperty("lastName"));

  const item = (property, setMethod) => {
    return (
      <TextField
        value={property}
        onChange={(event) => setMethod(event.target.value)}
      />
    );
  };

  return (
    <UserHeader
      firstName={edited ? item(firstName, setFirstName) : firstName}
      lastName={edited ? item(lastName, setLastName) : lastName}
      alignItems={edited ? "baseline" : "center"}
    />
  );
}

export default EditableUserHeader;
