import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import SiteHeader from "../../UI/SiteHeader";
import Avatar from "@material-ui/core/Avatar";

function UserHeader(props) {
  return (
    <Grid container spacing={2} direction={"row"} alignItems={props.alignItems}>
      <Grid item>
        <Avatar />
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

UserHeader.defaultProps = {
  alignItems: "center",
};

export default UserHeader;
