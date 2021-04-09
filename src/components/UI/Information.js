import React from "react";
import PropTypes from "prop-types";

function Information(props) {
  return <p className={props.class}>{props.info}</p>;
}

Information.propTypes = {
  info: PropTypes.string.isRequired,
  class: PropTypes.string,
};

Information.defaultProps = {
  info: "Informacja",
};

export default Information;
