import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Information from "../../UI/Information";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    columnCount: 2,
    wordBreak: "keep-all",
  },
}));

function EditableInformation() {
  const edited = useRecoilValue(userIsEditedState);
  const [bio, setBio] = useRecoilState(userProperty("bio"));
  const classes = useStyles();

  const handleChange = (event) => setBio(event.target.value);

  const editableBio = () => (
    <Box py={2}>
      <TextField
        className={classes.text}
        value={bio}
        multiline={true}
        fullWidth={true}
        onChange={handleChange}
      />
    </Box>
  );

  return (
    <>
      {edited ? editableBio() : <Information info={bio} class={classes.text} />}
    </>
  );
}

export default EditableInformation;
