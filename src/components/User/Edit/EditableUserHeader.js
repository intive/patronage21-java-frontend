import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { TextField } from "@material-ui/core";
import UserHeader from "../UI/UserHeader";
import { USER_FIRST_NAME_LABEL, USER_LAST_NAME_LABEL } from "../../../config/Constants";

function EditableUserHeader() {
  const edited = useRecoilValue(userIsEditedState);
  const [firstName, setFirstName] = useRecoilState(userProperty("firstName"));
  const [lastName, setLastName] = useRecoilState(userProperty("lastName"));
  const image = useRecoilValue(userProperty("image"));

  const handleChange = (setMethod, shouldBeTrimmed) => (event) => {
    setMethod(shouldBeTrimmed ? event.target.value.trim() : event.target.value);
  };

  const item = (label, property, setMethod, shouldBeTrimmed) => {
    return <TextField value={property} variant={"outlined"}  label={label} onChange={handleChange(setMethod, shouldBeTrimmed)} />;
  };

  return (
    <UserHeader
      firstName={edited ? item(USER_FIRST_NAME_LABEL, firstName, setFirstName, true) : firstName}
      lastName={edited ? item(USER_LAST_NAME_LABEL, lastName, setLastName, false) : lastName}
      image={image}
      alignItems={edited ? "baseline" : "center"}
    />
  );
}

export default EditableUserHeader;