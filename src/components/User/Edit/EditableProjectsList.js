import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userProperty, userIsEditedState } from "../../../state/atoms";
import { ListItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ProjectsList from "../ProjectsList";
import EditableProject from "./EditableProject";
import NewProject from "./NewProject";
import GroupList from "../../UI/GroupList";
import { USER_PROJECTS_TITLE, USER_PROJECTS_LIMIT } from "../../../config/Constants";

function EditableProjectsList() {
  const edited = useRecoilValue(userIsEditedState);
  const [projects, setProjects] = useRecoilState(userProperty("projects"));
  const isInactive = projects.length >= USER_PROJECTS_LIMIT;

  const onToggleDelete = (index) => () => {
    const updatedProjects = [...projects];
    if (index !== -1) {
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };

  const deleteButton = (index) => (
    <ListItemSecondaryAction>
      <IconButton aria-label="done" onClick={onToggleDelete(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  );

  const editableProjects = () => (
    <>
      {projects.map((project, index) => (
        <ListItem divider key={index}>
          <EditableProject
            index={index}
            projects={projects}
            updateProjects={setProjects}
          />
          {deleteButton(index)}
        </ListItem>
      ))}
      {<NewProject projects={projects} updateProjects={setProjects} inactive={isInactive}/>}
    </>
  );

  return (
    <>
      {edited ? (
        <GroupList title={USER_PROJECTS_TITLE} counter={projects.length}>
          {editableProjects()}
        </GroupList>
      ) : (
        <ProjectsList projects={projects} />
      )}
    </>
  );
}

export default EditableProjectsList;
