import React from "react";
import PropTypes from "prop-types";
import SiteHeader from "../UI/SiteHeader";

function TitleContainer(props) {
  return (
    <>
      <SiteHeader> {props.title}</SiteHeader>
      <p>{props.info}</p>
    </>
  );
}

TitleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default TitleContainer;
