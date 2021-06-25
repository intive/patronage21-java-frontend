import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import EditProjectRolesSelectInput from "./EditProjectRolesSelectInput";
import { useRecoilValueLoadable } from "recoil";
import { projectRolesByProjectIdQuery } from "../../../state/selectors";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE,
  PROJECT_NAME_PROPERTY,
  PROJECT_ROLE_PROPERTY,
  USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
} from "../../../config/Constants";

const styles = makeStyles({
  project: {
    fontWeight: 600,
    height: 25,
  },
  listItem: {
    padding:0,
    marginTop:8,
    marginBottom:8,
  },
  list: {
    marginTop: 0, 
    padding: 0,
  }
});

function EditableProject(props) {
  const classes = styles();
  const prevRolesRef = useRef();

  const [selectedProject, setSelectedProject] = useState(
    props.projects[props.index][PROJECT_NAME_PROPERTY]
  );

  const roles = useRecoilValueLoadable(
    projectRolesByProjectIdQuery(props.findProjectIdByName(selectedProject))
  );

  const prevSelectedProjectRef = useRef();
  useEffect(() => {
    prevSelectedProjectRef.current = selectedProject;
  });
  const prevSelectedProject = prevSelectedProjectRef.current;

  const firstUpdate = useRef(true);

  const changeValue = (index, propertyName, value) => {
    const updatedProjects = [...props.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [propertyName]: value,
    };
    props.updateProjects(updatedProjects);
  };

  const setDefaultRoleAfterProjectNameChanged = useCallback(() => {
    const updatedProjects = [...props.projects];
    updatedProjects[props.index] = {
      name: selectedProject,
      role: USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
    };
    props.updateProjects(updatedProjects);
  }, [props, selectedProject]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (prevSelectedProject !== selectedProject) {
      setDefaultRoleAfterProjectNameChanged();
    }
  }, [
    selectedProject,
    setDefaultRoleAfterProjectNameChanged,
    prevSelectedProject,
  ]);

  const handleProjectChange = (index, propertyName, value) => {
    if (propertyName !== PROJECT_NAME_PROPERTY) {
      return;
    }
    setSelectedProject(value);
    changeValue(index, "role", USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE);
  };

  const handleOnChange = (index, propertyName, value) => {
    handleProjectChange(index, propertyName, value);
    changeValue(index, propertyName, value);
  };

  const getOptions = (propertyName, projectsNames, projectRoles) => {
    if (propertyName === PROJECT_NAME_PROPERTY) {
      return projectsNames;
    }
    return projectRoles.length === 0
      ? [USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE]
      : [...projectRoles, USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE];
  };

  const item = (project, index, propertyName, projectRoles) => (
    <ListItem
      disableGutters={true}
      className={classes.listItem}
      key={propertyName}
    >
      <EditProjectRolesSelectInput
        index={index}
        value={
          propertyName === PROJECT_ROLE_PROPERTY && projectRoles.length === 0
            ? USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE
            : project[propertyName]
        }
        propertyName={propertyName}
        onChange={handleOnChange}
        options={getOptions(propertyName, props.projectsNames, projectRoles)}
        disabled={
          propertyName === PROJECT_ROLE_PROPERTY && projectRoles.length === 0
        }
      />
    </ListItem>
  );

  return (
    <List className={classes.list} >
      {Object.keys(props.projects[props.index]).map((key) =>
        item(
          props.projects[props.index],
          props.index,
          key,
          props.loadableRoles(prevRolesRef, roles)
        )
      )}
    </List>
  );
}

EditableProject.propTypes = {
  index: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
  updateProjects: PropTypes.func.isRequired,
  findProjectIdByName: PropTypes.func.isRequired,
  projectsNames: PropTypes.array.isRequired,
};

export default EditableProject;
