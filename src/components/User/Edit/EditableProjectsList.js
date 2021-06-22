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
import {
  USER_PROJECTS_TITLE,
  USER_PROJECTS_LIMIT,
  LOADABLE_ROLES_STATE_HAS_VALUE,
  LOADABLE_ROLES_STATE_LOADING,
  LOADABLE_ROLES_STATE_HAS_ERROR,
  USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
  PROJECT_ID_PROPERTY,
  PROJECT_NAME_PROPERTY,
} from "../../../config/Constants";
import { projectsQuery,  } from "../../../state/selectors";

function EditableProjectsList() {
  const edited = useRecoilValue(userIsEditedState);
  const [projects, setProjects] = useRecoilState(userProperty("projects"));
  const isInactive = projects.length >= USER_PROJECTS_LIMIT;
  const [availableProjects] = useRecoilState(
    projectsQuery(new Date().getFullYear())
  );

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

  const projectsNames = availableProjects.map(function (item) {
    return item[PROJECT_NAME_PROPERTY];
  });

  const findProjectIdByName = (name) => {
    if (
      name === "" ||
      name === USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE ||
      availableProjects.length === 0
    ) {
      return;
    }
    return availableProjects.find((element) => element.name === name)[
      PROJECT_ID_PROPERTY
    ];
  };

  const loadableRoles = (prevRolesRef, roles) => {
    switch (roles.state) {
      case LOADABLE_ROLES_STATE_HAS_VALUE:
        prevRolesRef.current = [...roles.contents];
        return roles.contents;
      case LOADABLE_ROLES_STATE_LOADING:
      case LOADABLE_ROLES_STATE_HAS_ERROR:
      default:
        if (!prevRolesRef.current) prevRolesRef.current = [];
        return prevRolesRef.current;
    }
  };

  const editableProjects = () => (
    <>
      {projects.map((project, index) => (
        <ListItem divider key={index}>
          <EditableProject
            index={index}
            projects={projects}
            updateProjects={setProjects}
            projectsNames={projectsNames}
            findProjectIdByName={findProjectIdByName}
            loadableRoles={loadableRoles}
          />
          {deleteButton(index)}
        </ListItem>
      ))}
      {
        <NewProject
          projects={projects}
          updateProjects={setProjects}
          projectsNames={projectsNames}
          findProjectIdByName={findProjectIdByName}
          inactive={isInactive}
          loadableRoles={loadableRoles}
        />
      }
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
