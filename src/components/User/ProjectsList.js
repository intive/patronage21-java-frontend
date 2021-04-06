import React from "react";
import PropTypes from "prop-types";
import ListGroup from "./ListGroup";
import {ListItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {USER_PROJECTS_TITLE} from "../../config/Constants";

const styles = makeStyles(theme => ({
    project: {
        fontWeight: 600,
        height: 25,
    },
    role: {
        color: theme.customPalette.text.secondary,
    },
}));

function ProjectsList(props) {
    return(
        <ListGroup groupTitle={USER_PROJECTS_TITLE} groupCounter={props.projects.length}>
            {generateListItems(props.projects)}
        </ListGroup>
    );
}

ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired,
}

export default ProjectsList;

export function generateListItems(list) {
    const classes = styles();
    return list.map((item, index) => {
        return (
            <ListItem divider = {index !== list.length - 1} key={item.name}>
                <Grid container direction={'column'}>
                    <Grid item className={classes.project}>
                        <strong>{item.name}</strong>
                    </Grid>
                    <Grid item className={classes.role}>
                        <small>{item.role}</small>
                    </Grid>
                </Grid>
            </ListItem>
        );
    })
}