import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const Bio = styled.p`
  padding-left: 15px;
  padding-right: 15px;
  word-break: "keep-all";
  ${({ theme }) => theme.breakpoints.up("md")} {
    column-count: 2;
  }
`;

function EditableInformation() {
  const edited = useRecoilValue(userIsEditedState);
  const [bio, setBio] = useRecoilState(userProperty("bio"));

  const handleChange = (event) => setBio(event.target.value);

  const editableBio = () => (
    <TextField
      value={bio}
      style={{ padding: "10px" }}
      multiline={true}
      fullWidth={true}
      onChange={handleChange}
    />
  );

  return <>{edited ? editableBio() : <Bio>{bio}</Bio>}</>;
}

export default EditableInformation;
