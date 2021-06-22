import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function SelectInput(props) {
  const items = props.list.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <Select value={props.value} onChange={props.handleChange}>
      {items}
    </Select>
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
