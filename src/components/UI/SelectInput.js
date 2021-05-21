import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
  },
});

function SelectInput(props) {
  const classes = useStyles();
  const items = props.list.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        className={classes.input}
        value={props.value}
        onChange={props.handleChange}
      >
        {items}
      </Select>
    </FormControl>
  );
}

SelectInput.propTypes = {
  list: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  list: [],
  value: "all",
};

export default SelectInput;
