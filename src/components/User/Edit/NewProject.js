import { ListItem, Popover, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import theme from "../../../styles/theme";
import {
  PROJECTS_LIMIT_MESSAGE,
  PROJECT_LABEL,
  PROJECT_ROLE_LABEL,
  USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
  USER_PROJECT_DROPDOWN_UNAVAILABLE_VALUE,
  USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
  USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE,
} from "../../../config/Constants";
import { PROJECT_ROLE_ADD_ACTION_NAME } from "../../../config/AlertConstants";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import EditionSelect from "./EditionSelect";
import {
  projectRolesByProjectIdQuery,
  setProjectAndRoleToValidateState,
} from "../../../state/selectors";
import {
  checkProjectWithRoleAddAlerts,
  hasNewProjectInputError,
  showAlert,
} from "../../../alerts/alertDropdownSelectors";
import { selectedProjectState } from "../../../state/atoms";
import FormControl from "@material-ui/core/FormControl";

const styles = makeStyles(() => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: 10,
    color: theme.customPalette.colors.listItemHovered,
    background: theme.customPalette.text.secondary,
  },
  list: {
    padding:0,
  },
  topSelect: {
    marginBottom: 8,
    display: "flex",
    width: 200,
  },
  bottomSelect: {
    display: "flex",
    width: 200,
  },
}));

function NewProject(props) {
  const classes = styles();
  const prevRolesRef = useRef();
  const setValuesToValidate = useSetRecoilState(
    setProjectAndRoleToValidateState
  );
  const setProjectEditionAlerts = useSetRecoilState(
    checkProjectWithRoleAddAlerts
  );

  const showAlertTrigger = useSetRecoilState(showAlert);

  const [anchorElement, setAnchorElement] = useState(null);
  const [newProjectName, setNewProjectName] = useState(
    USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE
  );
  const [newProjectRole, setNewProjectRole] = useState(
    USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE
  );

  const hasProjectInputError = useRecoilValue(
    hasNewProjectInputError({ name: newProjectName, role: newProjectRole })
  );

  function validateAddProject() {
    setProjectEditionAlerts("addProject");
  }

  const handleRoleChange = (label) => {
    setValuesToValidate({
      title: PROJECT_ROLE_ADD_ACTION_NAME,
      projectName: newProjectName,
      projectRole: label,
    });
    setNewProjectRole(label);
    validateAddProject();
  };

  const handleProjectChange = (label) => {
    setValuesToValidate({
      title: PROJECT_ROLE_ADD_ACTION_NAME,
      projectName: label,
      projectRole: newProjectRole,
    });
    setNewProjectName(label);
    validateAddProject();
  };

  useEffect(() => {
    setValuesToValidate({
      title: PROJECT_ROLE_ADD_ACTION_NAME,
      projectName: newProjectName,
      projectRole: newProjectRole,
    });
  }, [newProjectName, newProjectRole, setValuesToValidate]);

  function handleAdd() {
    validateAddProject();
    if (hasProjectInputError) {
      showAlertTrigger();
      return;
    }
    const newProject = { name: newProjectName, role: newProjectRole };
    const updatedProjects = [...props.projects];
    updatedProjects.push(newProject);
    props.updateProjects(updatedProjects);
    setNewProjectName(USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE);
    setNewProjectRole(USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE);
    setValuesToValidate({
      title: PROJECT_ROLE_ADD_ACTION_NAME,
      projectName: USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
      projectRole: USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
    });
  }

  const handlePopoverOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);

  const [selectedProject, setSelectedProject] = useState(
    useRecoilValue(selectedProjectState)
  );

  const roles = useRecoilValueLoadable(
    projectRolesByProjectIdQuery(props.findProjectIdByName(selectedProject))
  );

  const handleChange = (functionOnChange, label) => (event) => {
    validateAddProject();
    label === PROJECT_LABEL && setSelectedProject(event.target.value);
    functionOnChange(event.target.value);
  };

  const item = (value, label, functionOnChange, options, itemDisabled, style) => (
    <FormControl
      variant="outlined"
      className={style}
      disabled={itemDisabled}
    >
      <EditionSelect
        list={options}
        value={value}
        disabled={props.inactive}
        handleChange={handleChange(functionOnChange, label)}
      />
    </FormControl>
  );

  const getRoleOptions = (newProjectName, newProjectRole, loadableRoles) => {
    if (
      loadableRoles.length === 0 ||
      newProjectName === USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE
    ) {
      return [USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE];
    }
    return newProjectRole === USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE
      ? [USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE, ...loadableRoles]
      : [...loadableRoles];
  };

  const getProjectOptions = (newProjectName, projectsNames) => {
    if (projectsNames.length === 0) {
      return [USER_PROJECT_DROPDOWN_UNAVAILABLE_VALUE];
    }
    return newProjectName === USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE
      ? [USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE, ...projectsNames]
      : [...projectsNames];
  };

  return (
    <ListItem disabled={props.inactive}>
      <List className={classes.list}>
        {item(
          props.projectsNames.length === 0
            ? USER_PROJECT_DROPDOWN_UNAVAILABLE_VALUE
            : newProjectName,
          PROJECT_LABEL,
          handleProjectChange,
          getProjectOptions(newProjectName, props.projectsNames),
          props.projectsNames.length === 0,
          classes.topSelect
        )}
        {item(
          props.loadableRoles(prevRolesRef, roles).length === 0 ||
            newProjectName === USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE
            ? USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE
            : newProjectRole,
          PROJECT_ROLE_LABEL,
          handleRoleChange,
          getRoleOptions(
            newProjectName,
            newProjectRole,
            props.loadableRoles(prevRolesRef, roles)
          ),
          newProjectName === USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE ||
            props.projectsNames.length === 0 ||
            props.loadableRoles(prevRolesRef, roles).length === 0,
          classes.bottomSelect
        )}
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
  findProjectIdByName: PropTypes.func.isRequired,
  projectsNames: PropTypes.array.isRequired,
};

export default NewProject;
