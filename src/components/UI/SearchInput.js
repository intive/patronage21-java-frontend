import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
  },
});

function SearchInput(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <OutlinedInput
        value={value}
        placeholder={props.placeholder}
        onChange={handleChange}
        inputProps={{
          "aria-label": props.ariaLabel,
        }}
        labelWidth={0}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

SearchInput.defaultProps = {
  placeholder: "Wyszukaj",
  ariaLabel: "search",
};

export default SearchInput;
