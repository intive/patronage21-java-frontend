import { ListItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { useState } from "react";

const styles = makeStyles(() => ({
  project: {
    fontWeight: 600,
    height: 25,
  },
}));

function NewProject(props) {
  const classes = styles();

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectRole, setNewProjectRole] = useState("");

  function handleNewProjectNameChange(event) {
    setNewProjectName(event.target.value);
  }

  function handleNewProjectRoleChange(event) {
    setNewProjectRole(event.target.value);
  }

  function handleAdd() {
    const newProject = { name: newProjectName, role: newProjectRole };
    let userToModify = Object.assign({}, props.user);
    userToModify.projects.push(newProject);
    props.setUser(userToModify);
    setNewProjectName("");
    setNewProjectRole("");
  }

  const item = (value, label, functionOnChange) => (
    <ListItem disableGutters={true}>
      <TextField
        value={value}
        label={label}
        className={classes.project}
        onChange={functionOnChange}
      />
    </ListItem>
  );

  return (
    <ListItem>
      <List>
        {item(newProjectName, "projekt", handleNewProjectNameChange)}
        {item(newProjectRole, "rola", handleNewProjectRoleChange)}
      </List>
      <ListItemSecondaryAction>
        <IconButton aria-label="add" onClick={handleAdd}>
          <AddCircleOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

NewProject.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default NewProject;
