import { ListItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import ProjectsList from "../ProjectsList";
import EditableProject from "./EditableProject";
import NewProject from "./NewProject";
import ListGroup from "../ListGroup";
import { USER_PROJECTS_TITLE } from "../../../config/Constants";

function EditableProjectsList(props) {
  function onToggleDelete(index) {
    let array = [...props.user.projects];
    if (index !== -1) {
      array.splice(index, 1);
      let userModified = Object.assign({}, props.user);
      userModified.projects = array;
      props.setUser(userModified);
    }
  }

  const deleteButton = (index) => (
    <ListItemSecondaryAction>
      <IconButton aria-label="done" onClick={() => onToggleDelete(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  );

  const editableProjects = () => (
    <>
      {props.user.projects.map((project, index) => (
        <ListItem divider key={index}>
          <EditableProject
            project={project}
            index={index}
            user={props.user}
            setUser={props.setUser}
          />
          {deleteButton(index)}
        </ListItem>
      ))}
      {<NewProject user={props.user} setUser={props.setUser} />}
    </>
  );

  return (
    <>
      {props.edit ? (
        <ListGroup
          groupTitle={USER_PROJECTS_TITLE}
          groupCounter={props.user.projects.length}
        >
          {editableProjects()}
        </ListGroup>
      ) : (
        <ProjectsList projects={props.user.projects} />
      )}
    </>
  );
}

EditableProjectsList.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default EditableProjectsList;
