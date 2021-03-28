import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import SiteHeader from "../UI/SiteHeader";
import Avatar from "@material-ui/core/Avatar";

function UserHeader(props) {
    return (
        <Grid container spacing={2} direction={'row'} alignItems={'center'}>
            <Grid item>
                <Avatar/>
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
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

export default UserHeader;