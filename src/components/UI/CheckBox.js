import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiCheckbox from "@material-ui/core/Checkbox";

const Checkbox = (props) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={props.checked}
          onChange={props.handleChange}
          color="primary"
        />
      }
      label={props.label}
    />
  );
};

export default Checkbox;
