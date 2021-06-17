import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const Bio = styled.p`
  ${({ theme }) => theme.breakpoints.up("sm")} {
    column-count: 2;
  }
`;

const styles = makeStyles({
  textField: {
    padding: 15,
  },
  bio: {
    wordBreak: "break-word",
    margin: 15
  },
});

function EditableInformation() {
  const edited = useRecoilValue(userIsEditedState);
  const [bio, setBio] = useRecoilState(userProperty("bio"));
  const classes = styles();

  const handleChange = (event) => setBio(event.target.value);

  const editableBio = () => (
    <TextField
      value={bio ? bio : ""}
      className={classes.textField}
      multiline
      fullWidth
      onChange={handleChange}
    />
  );

  const displayBio = () => (
    <div className={classes.bio}>
      <Bio>{bio}</Bio>
    </div>
  );

  return <>{edited ? editableBio() : displayBio()}</>;
}

export default EditableInformation;
