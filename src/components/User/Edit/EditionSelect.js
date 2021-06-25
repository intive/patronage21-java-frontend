import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE, USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE } from "../../../config/Constants";

const useStyles = makeStyles({
  select: {
    margin: 0,
  },
  input: {
    padding: "10px 14px",
  }
});

function EditionSelect(props) {
  const classes = useStyles();
  const items = props.list.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <Select 
      value={props.value 
        ? props.value 
        : USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE} 
      onChange={props.handleChange} 
      className={classes.select}
      disabled={props.list[0] === USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE || props.disabled}
      input={<OutlinedInput classes={{input: classes.input}}/>}
    >
      {items}
    </Select>
  );
}

EditionSelect.propTypes = {
  list: PropTypes.array.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

EditionSelect.defaultProps = {
  list: [],
  value: "all",
};

export default EditionSelect;
