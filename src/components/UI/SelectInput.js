import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    margin: 0,
  },
  input: {
    padding: "10px 14px",
  }
});

function SelectInput(props) {
  const classes = useStyles();
  const items = props.list.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <Select 
      value={props.value} 
      onChange={props.handleChange} 
      className={classes.select}
      input={props.applyInput ? <OutlinedInput classes={{input: classes.input}}/> : <OutlinedInput/>}
    >
      {items}
    </Select>
  );
}

SelectInput.propTypes = {
  list: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  applyInput: PropTypes.bool.isRequired,
};

SelectInput.defaultProps = {
  list: [],
  value: "all",
};

export default SelectInput;
