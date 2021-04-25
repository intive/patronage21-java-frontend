import { ListItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  project: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    height: 25,
  },
  listItem: {
    height: 50,
  },
}));

function EditableProject(props) {
  const classes = styles();

  function handleOnChange(event, index, propertyName) {
    const updatedProjects = [...props.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [propertyName]: event.target.value,
    };
    props.updateProjects(updatedProjects);
  }

  const item = (project, index, propertyName) => (
    <ListItem
      disableGutters={true}
      className={classes.listItem}
      key={propertyName}
    >
      <TextField
        value={project[propertyName]}
        className={classes.project}
        onChange={(event) => handleOnChange(event, index, propertyName)}
      />
    </ListItem>
  );

  return (
    <List>
      {Object.keys(props.projects[props.index]).map((key) =>
        item(props.projects[props.index], props.index, key)
      )}
    </List>
  );
}

EditableProject.propTypes = {
  index: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
  updateProjects: PropTypes.func.isRequired,
};

export default EditableProject;
