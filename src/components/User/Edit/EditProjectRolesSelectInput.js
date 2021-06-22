import React from "react";
import SelectInput from "../../UI/SelectInput";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
    width: 200,
  },
});

function EditProjectRolesSelectInput(props) {
  const classes = useStyles();

  const handleChange = (e) =>
    props.onChange(props.index, props.propertyName, e.target.value);

  return (
    <FormControl variant="outlined" className={classes.formControl} disabled={props.disabled}>
      <SelectInput
        list={props.options}
        value={props.value}
        handleChange={handleChange}
      />
    </FormControl>
  );
}

EditProjectRolesSelectInput.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  propertyName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default EditProjectRolesSelectInput;
