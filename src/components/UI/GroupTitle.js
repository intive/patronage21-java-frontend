import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = makeStyles((theme) => ({
  root: {
    background: theme.customPalette.colors.bar,
    display: "flex",
  },
  title: {
    flex: "1",
    fontWeight: 600,
    lineHeight: "inherit",
  },
}));

const GroupTitle = (props) => {
  const classes = styles();
  return (
    <ListSubheader className={classes.root}>
      <Typography className={classes.title} color={"primary"}>
        {props.children}
      </Typography>
    </ListSubheader>
  );
};

export default GroupTitle;
