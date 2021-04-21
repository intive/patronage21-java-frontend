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
    const { value } = event.target;
    let userToUpdate = Object.assign({}, props.user);
    userToUpdate.projects[index][propertyName] = value;
    props.setUser(userToUpdate);
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
      {Object.keys(props.project).map((key) =>
        item(props.project, props.index, key)
      )}
    </List>
  );
}

EditableProject.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default EditableProject;
