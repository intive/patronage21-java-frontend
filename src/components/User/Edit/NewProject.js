import { ListItem, Popover, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { useState } from "react";
import theme from "../../../styles/theme";
import { PROJECTS_LIMIT_MESSAGE } from "../../../config/Constants";

const styles = makeStyles(() => ({
  project: {
    fontWeight: 600,
    height: 25,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: 10,
    color: theme.customPalette.colors.listItemHovered,
    background: theme.customPalette.text.secondary,
  },
}));

function NewProject(props) {
  const classes = styles();

  const [anchorElement, setAnchorElement] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectRole, setNewProjectRole] = useState("");

  function handleAdd() {
    const newProject = { name: newProjectName, role: newProjectRole };
    const updatedProjects = [...props.projects];
    updatedProjects.push(newProject);
    props.updateProjects(updatedProjects);
    setNewProjectName("");
    setNewProjectRole("");
  }

  const handlePopoverOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);

  const handleChange = (functionOnChange) => (event) => {
    functionOnChange(event.target.value);
  };

  const item = (value, label, functionOnChange) => (
    <ListItem disableGutters={true}>
      <TextField
        value={value}
        label={label}
        className={classes.project}
        onChange={handleChange(functionOnChange)}
        disabled={props.inactive}
      />
    </ListItem>
  );

  return (
    <ListItem disabled={props.inactive}>
      <List>
        {item(newProjectName, "projekt", setNewProjectName)}
        {item(newProjectRole, "rola", setNewProjectRole)}
      </List>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="add"
          onClick={props.inactive ? null : handleAdd}
          onMouseEnter={props.inactive ? handlePopoverOpen : null}
          onMouseLeave={props.inactive ? handlePopoverClose : null}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{PROJECTS_LIMIT_MESSAGE}</Typography>
        </Popover>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

NewProject.propTypes = {
  projects: PropTypes.array.isRequired,
  updateProjects: PropTypes.func.isRequired,
  inactive: PropTypes.bool.isRequired,
};

export default NewProject;
