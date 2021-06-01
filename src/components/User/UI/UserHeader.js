import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import SiteHeader from "../../UI/SiteHeader";
import EditableImage from "../Edit/EditableImage";

function UserHeader(props) {
  return (
    <Grid container spacing={2} direction={"row"} alignItems="center">
      <Grid item>
        <EditableImage firstName={props.firstName} />
      </Grid>
      <Grid item>
        <SiteHeader>
          {props.firstName} {props.lastName}
        </SiteHeader>
      </Grid>
    </Grid>
  );
}

UserHeader.propTypes = {
  firstName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  lastName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};

export default UserHeader;
