import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
  },
});

function SearchInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <Tooltip
        title={props.tooltipMessage}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
      >
        <OutlinedInput
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.handleChange}
          type="search"
          inputProps={{
            "aria-label": props.ariaLabel,
          }}
          labelWidth={0}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="search"
                disableFocusRipple
                disableRipple
                style={{ backgroundColor: "transparent" }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Tooltip>
    </FormControl>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
};

SearchInput.defaultProps = {
  placeholder: "Wyszukaj",
  ariaLabel: "search",
  value: "",
};

export default SearchInput;
