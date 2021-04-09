import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ListItem, ListItemText } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.primary,
    wordBreak: "break-all",
  },
  button: {
    maxWidth: 180,
    width: "100%",
  },
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function ContactItem(props) {
  let classes = styles();
  return (
    <ListItem
      className={classes.listItem}
      divider={props.divider}
      key={props.name}
    >
      <ListItemText className={classes.text} primary={props.contact} />
      <Grid container>
        <Grid item xs={12} md={7} lg={5}>
          <Button
            className={classes.button}
            variant={"contained"}
            color={"secondary"}
          >
            {props.text}
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  divider: PropTypes.bool.isRequired,
};

export default ContactItem;
