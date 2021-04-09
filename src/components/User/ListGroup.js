import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import { UserListTitle } from "../Home/UserList";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  userListHeader: {
    background: theme.customPalette.colors.bar,
    display: "flex",
    fontSize: "15px",
    color: theme.palette.primary.main,
  },
}));

const ListGroup = (props) => {
  let classes = styles();
  return (
    <Grid item md={6} sm={6} xs={12}>
      <List
        subheader={
          <ListSubheader className={classes.userListHeader}>
            <UserListTitle>{props.groupTitle}</UserListTitle>
            {props.groupCounter}
          </ListSubheader>
        }
      >
        {props.children}
      </List>
    </Grid>
  );
};

ListGroup.propTypes = {
  groupTitle: PropTypes.string.isRequired,
  groupCounter: PropTypes.number,
};

export default ListGroup;
